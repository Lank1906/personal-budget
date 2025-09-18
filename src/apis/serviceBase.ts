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
      successMessage: options?.successMessage || 'Tạo tài liệu thành công',
      errorMessage: options?.errorMessage || 'Tạo tài liệu thất bại',
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
      successMessage: options?.successMessage || 'Thêm tài liệu thành công',
      errorMessage: options?.errorMessage || 'Thêm tài liệu thất bại',
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
      successMessage: options?.successMessage || 'Cập nhật tài liệu thành công',
      errorMessage: options?.errorMessage || 'Cập nhật tài liệu thất bại',
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
      successMessage: options?.successMessage || 'Xóa tài liệu thành công',
      errorMessage: options?.errorMessage || 'Xóa tài liệu thất bại',
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
      errorMessage: options?.errorMessage || 'Lấy tài liệu thất bại',
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
      errorMessage: options?.errorMessage || 'Tìm kiếm tài liệu thất bại',
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
      successMessage: options?.successMessage || 'Thêm tài liệu con thành công',
      errorMessage: options?.errorMessage || 'Thêm tài liệu con thất bại',
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
      successMessage: options?.successMessage || 'Cập nhật tài liệu con thành công',
      errorMessage: options?.errorMessage || 'Cập nhật tài liệu con thất bại',
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
      successMessage: options?.successMessage || 'Xóa tài liệu con thành công',
      errorMessage: options?.errorMessage || 'Xóa tài liệu con thất bại',
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
      errorMessage: options?.errorMessage || 'Lấy tài liệu con thất bại',
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
      errorMessage: options?.errorMessage || 'Tìm kiếm tài liệu con thất bại',
      disableToast: options?.disableToast ?? true,
    });
  }
}
