import { serverTimestamp, arrayUnion } from 'firebase/firestore';
import { FirestoreService } from './serviceBase';
import { db } from '../firebase';

const userService = new FirestoreService(db, 'users');
const groupService = new FirestoreService(db, 'groups');

export async function initUserData(user: {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}) {
  const userResult = await userService.getDoc(user.email);

  if (!userResult.success) {
    throw new Error(userResult.error || 'Failed to get user');
  }

  if (!userResult.data) {
    await userService.updateDoc(
      user.uid,
      {
        displayName: user.displayName,
        photoURL: user.photoURL,
        groups: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      undefined,
      { successMessage: 'Created', errorMessage: 'Error' },
    );
  }

  const groupResult = await groupService.addDoc(
    {
      name: `${user.displayName}'s Group`,
      members: [user.email],
      ownerId: user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    undefined,
    { successMessage: 'Created', errorMessage: 'Error' },
  );

  if (!groupResult.success) {
    throw new Error(groupResult.error || 'Failed to create group');
  }
  const groupId = groupResult.data;

  await userService.updateDoc(
    user.email,
    {
      groups: arrayUnion(groupId),
      updatedAt: serverTimestamp(),
    },
    undefined,
    { successMessage: 'Created', errorMessage: 'Error' },
  );

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

  return { userId: user.email, groupId };
}
