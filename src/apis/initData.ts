import { serverTimestamp, arrayUnion } from 'firebase/firestore';
import { FirestoreService } from './serviceBase';
import { db } from '../firebase';

const userService = new FirestoreService(db, 'users');
const groupService = new FirestoreService(db, 'groups');

export async function initUserData(user: { email: string; displayName: string; photoURL: string }) {
  const userResult = await userService.getDoc(user.email);
  if (!userResult.success) throw new Error(userResult.error || 'Failed to get user');

  let userDoc = userResult.data;

  if (!userDoc) {
    await userService.setDoc(user.email, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      groups: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    userDoc = { groups: [] };
  }

  let groupId: string;
  if (!userDoc.groups || userDoc.groups.length === 0) {
    const groupRes = await groupService.addDoc({
      name: `${user.displayName}'s Group`,
      members: [user.email],
      ownerId: user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    if (!groupRes.success) throw new Error(groupRes.error || 'Failed to create group');
    groupId = groupRes.data;

    await userService.updateDoc(user.email, {
      groups: arrayUnion(groupId),
      updatedAt: serverTimestamp(),
    });

    await groupService.addSubCollectionDoc(groupId, 'wallets', {
      name: 'Cash',
      balance: 0,
      currency: 'USD',
      createdAt: serverTimestamp(),
      createdBy: user.email,
    });

    await groupService.addSubCollectionDoc(groupId, 'categories', {
      name: 'Salary',
      type: 'income',
      budget: 0,
      spent: 0,
      icon: '💰',
      createdAt: serverTimestamp(),
      createdBy: user.email,
    });

    await groupService.addSubCollectionDoc(groupId, 'categories', {
      name: 'Food',
      type: 'expense',
      budget: 0,
      spent: 0,
      icon: '🍔',
      createdAt: serverTimestamp(),
      createdBy: user.email,
    });
  } else {
    groupId = userDoc.groups[0];
  }

  return { userId: user.email, groupId };
}
