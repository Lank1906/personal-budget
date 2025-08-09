## This Folder will containt functions call api to BE.

onSnapshot(collection(db, 'Lank'), (snapshot) => {
snapshot.docs.map((doc) => doc.data());
});
