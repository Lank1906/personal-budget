import {
  collection,
  doc,
  setDoc as fbSetDoc,
  addDoc as fbAddDoc,
  updateDoc as fbUpdateDoc,
  deleteDoc as fbDeleteDoc,
  getDoc as fbGetDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  Firestore,
} from 'firebase/firestore';

import { callFirebaseApi } from './firebase';
import { Callbacks, SearchOptions } from '../types/service';
import { t } from 'i18next';

export class FirestoreService {
  private firestore: Firestore;
  private collectionName: string;

  constructor(firestore: Firestore, collectionName: string) {
    this.firestore = firestore;
    this.collectionName = collectionName;
  }

  setDoc(
    id: string,
    data: object,
    callbacks?: Callbacks,
    options?: { successMessage?: string; errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const docRef = doc(this.firestore, this.collectionName, id);
        await fbSetDoc(docRef, data);
        return id;
      },
      successFn: callbacks?.successFn,
      failFn: callbacks?.failFn,
      successMessage: options?.successMessage || t<string>('baseService.setDocComplete'),
      errorMessage: options?.errorMessage || t<string>('baseService.setDocFail'),
      disableToast: options?.disableToast ?? false,
    });
  }

  addDoc(
    data: object,
    callbacks?: Callbacks,
    options?: { successMessage?: string; errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const colRef = collection(this.firestore, this.collectionName);
        const docRef = await fbAddDoc(colRef, data);
        return docRef.id;
      },
      successFn: callbacks?.successFn,
      failFn: callbacks?.failFn,
      successMessage: options?.successMessage || t<string>('baseService.addDocComplete'),
      errorMessage: options?.errorMessage || t<string>('baseService.addDocFail'),
      disableToast: options?.disableToast ?? false,
    });
  }

  updateDoc(
    id: string,
    data: Partial<object>,
    callbacks?: Callbacks,
    options?: { successMessage?: string; errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const docRef = doc(this.firestore, this.collectionName, id);
        await fbUpdateDoc(docRef, data);
      },
      successFn: callbacks?.successFn,
      failFn: callbacks?.failFn,
      successMessage: options?.successMessage || t<string>('baseService.updateDocComplete'),
      errorMessage: options?.errorMessage || t<string>('baseService.updateDocFail'),
      disableToast: options?.disableToast ?? false,
    });
  }

  deleteDoc(
    id: string,
    callbacks?: Callbacks,
    options?: { successMessage?: string; errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const docRef = doc(this.firestore, this.collectionName, id);
        await fbDeleteDoc(docRef);
      },
      successFn: callbacks?.successFn,
      failFn: callbacks?.failFn,
      successMessage: options?.successMessage || t<string>('baseService.deleteDocComplete'),
      errorMessage: options?.errorMessage || t<string>('baseService.deleteDocFail'),
      disableToast: options?.disableToast ?? false,
    });
  }

  getDoc(
    id: string,
    callbacks?: Callbacks,
    options?: { errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const docRef = doc(this.firestore, this.collectionName, id);
        const docSnap = await fbGetDoc(docRef);
        if (!docSnap.exists()) return null;
        return { id: docSnap.id, ...docSnap.data() };
      },
      failFn: callbacks?.failFn,
      successFn: callbacks?.successFn,
      errorMessage: options?.errorMessage || t<string>('baseService.getDocFail'),
      disableToast: options?.disableToast ?? true,
    });
  }

  searchDocs(
    optionsSearch?: SearchOptions,
    callbacks?: Callbacks,
    options?: { errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const colRef = collection(this.firestore, this.collectionName);
        const constraints = [];

        if (optionsSearch?.filters) {
          optionsSearch.filters.forEach(({ field, operator, value }) => {
            constraints.push(where(field, operator, value));
          });
        }

        if (optionsSearch?.orderByField) {
          constraints.push(
            orderBy(optionsSearch.orderByField, optionsSearch.orderDirection || 'asc'),
          );
        }

        if (optionsSearch?.pagination?.startAfterDoc) {
          constraints.push(startAfter(optionsSearch.pagination.startAfterDoc));
        }

        if (optionsSearch?.pagination?.limit) {
          constraints.push(limit(optionsSearch.pagination.limit));
        }

        const q = query(colRef, ...constraints);
        const querySnap = await getDocs(q);

        const docs = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Record<string, any>),
        }));

        const lastDoc =
          querySnap.docs.length > 0 ? querySnap.docs[querySnap.docs.length - 1] : null;

        return { docs, lastDoc };
      },
      failFn: callbacks?.failFn,
      successFn: callbacks?.successFn,
      errorMessage: options?.errorMessage || t<string>('baseService.searchDocFail'),
      disableToast: options?.disableToast ?? true,
    });
  }

  addSubCollectionDoc(
    parentId: string,
    subCollectionName: string,
    data: object,
    callbacks?: Callbacks,
    options?: { successMessage?: string; errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const subColRef = collection(
          this.firestore,
          this.collectionName,
          parentId,
          subCollectionName,
        );
        const docRef = await fbAddDoc(subColRef, data);
        return docRef.id;
      },
      successFn: callbacks?.successFn,
      failFn: callbacks?.failFn,
      successMessage: options?.successMessage || t<string>('baseService.addSubDocComplete'),
      errorMessage: options?.errorMessage || t<string>('baseService.addSubDocFail'),
      disableToast: options?.disableToast ?? false,
    });
  }

  updateSubCollectionDoc(
    parentId: string,
    subCollectionName: string,
    docId: string,
    data: Partial<object>,
    callbacks?: Callbacks,
    options?: { successMessage?: string; errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const docRef = doc(this.firestore, this.collectionName, parentId, subCollectionName, docId);
        await fbUpdateDoc(docRef, data);
      },
      successFn: callbacks?.successFn,
      failFn: callbacks?.failFn,
      successMessage: options?.successMessage || t<string>('baseService.updateSubDocComplete'),
      errorMessage: options?.errorMessage || t<string>('baseService.updateSubDocFail'),
      disableToast: options?.disableToast ?? false,
    });
  }

  deleteSubCollectionDoc(
    parentId: string,
    subCollectionName: string,
    docId: string,
    callbacks?: Callbacks,
    options?: { successMessage?: string; errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const docRef = doc(this.firestore, this.collectionName, parentId, subCollectionName, docId);
        await fbDeleteDoc(docRef);
      },
      successFn: callbacks?.successFn,
      failFn: callbacks?.failFn,
      successMessage: options?.successMessage || t<string>('baseService.deleteSubDocComplete'),
      errorMessage: options?.errorMessage || t<string>('baseService.deleteSubDocFail'),
      disableToast: options?.disableToast ?? false,
    });
  }

  getSubCollectionDoc(
    parentId: string,
    subCollectionName: string,
    docId: string,
    callbacks?: Callbacks,
    options?: { errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const docRef = doc(this.firestore, this.collectionName, parentId, subCollectionName, docId);
        const docSnap = await fbGetDoc(docRef);
        if (!docSnap.exists()) return null;
        return { id: docSnap.id, ...docSnap.data() };
      },
      failFn: callbacks?.failFn,
      successFn: callbacks?.successFn,
      errorMessage: options?.errorMessage || t<string>('baseService.getSubDocFail'),
      disableToast: options?.disableToast ?? true,
    });
  }

  searchSubCollectionDocs(
    parentId: string,
    subCollectionName: string,
    optionsSearch?: SearchOptions,
    callbacks?: Callbacks,
    options?: { errorMessage?: string; disableToast?: boolean },
  ) {
    return callFirebaseApi({
      action: async () => {
        const subColRef = collection(
          this.firestore,
          this.collectionName,
          parentId,
          subCollectionName,
        );
        const constraints = [];

        if (optionsSearch?.filters) {
          optionsSearch.filters.forEach(({ field, operator, value }) => {
            constraints.push(where(field, operator, value));
          });
        }

        if (optionsSearch?.orderByField) {
          constraints.push(
            orderBy(optionsSearch.orderByField, optionsSearch.orderDirection || 'asc'),
          );
        }

        if (optionsSearch?.pagination?.startAfterDoc) {
          constraints.push(startAfter(optionsSearch.pagination.startAfterDoc));
        }

        if (optionsSearch?.pagination?.limit) {
          constraints.push(limit(optionsSearch.pagination.limit));
        }

        const q = query(subColRef, ...constraints);
        const querySnap = await getDocs(q);

        const docs = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Record<string, any>),
        }));

        const lastDoc =
          querySnap.docs.length > 0 ? querySnap.docs[querySnap.docs.length - 1] : null;

        return { docs, lastDoc };
      },
      failFn: callbacks?.failFn,
      successFn: callbacks?.successFn,
      errorMessage: options?.errorMessage || t<string>('baseService.searchSubDocFail'),
      disableToast: options?.disableToast ?? true,
    });
  }
}
