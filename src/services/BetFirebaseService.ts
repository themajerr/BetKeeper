import BetEntry from '../models/BetEntry'
import { BetDataService } from '../providers/BetDataProvider'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  Firestore,
} from 'firebase/firestore/lite'
import { FirebaseConfig } from '../models/DatabaseConnector'

/**
 * Bet Firebase storage Service
 *
 * Keep your bets on your Firebase storage.
 *
 * EXAMPLE OF VALID CLASS DESIGN
 */
export default class BetFirebaseService implements BetDataService {
  private static BET_COLLECTION_NAME = 'bets'

  constructor(config: FirebaseConfig) {
    this.connect(config)
  }

  private firestore?: Firestore

  private connect(config: FirebaseConfig) {
    try {
      this.firestore = getFirestore(initializeApp(config))
    } catch (e: unknown) {
      console.error(e)
    }
  }

  async getAllBets(): Promise<BetEntry[]> {
    if (!this.firestore) throw 'Firestore not initialized!'
    const results = await getDocs(
      collection(this.firestore, BetFirebaseService.BET_COLLECTION_NAME)
    )
    const bets: BetEntry[] = []
    results.forEach((doc) => {
      const bet = doc.data()
      bets.push(BetEntry.fromObject(bet))
    })
    return bets
  }
  getBetById(id: string): Promise<BetEntry> {
    throw new Error(`Method not implemented. getById(${id})`)
  }

  async addNewBet(bet: BetEntry): Promise<BetEntry> {
    if (!this.firestore) throw 'Firestore not initialized!'
    const doc = await addDoc(
      collection(this.firestore, BetFirebaseService.BET_COLLECTION_NAME),
      bet
    )
    bet.id = doc.id
    return bet
  }
  async updateBet(bet: BetEntry): Promise<BetEntry> {
    if (!this.firestore) throw 'Firestore not initialized!'
    const betRef = doc(
      collection(this.firestore, BetFirebaseService.BET_COLLECTION_NAME),
      bet.id.toString()
    )
    setDoc(betRef, bet).catch((e: unknown) => {
      console.error('failed', e)
    })
    return bet
  }
  async deleteBet(id: string): Promise<void> {
    if (!this.firestore) throw 'Firestore not initialized!'
    await deleteDoc(
      doc(this.firestore, BetFirebaseService.BET_COLLECTION_NAME, id.toString())
    )
  }
}
