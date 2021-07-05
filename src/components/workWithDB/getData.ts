import firebase from 'firebase';

async function getData(path: string): Promise<{name: string, consultationTime: string, time: [string, string][]}[][]> {
  const result: Array<{name: string, consultationTime: string, time: [string, string][]}[]> = [];
  try {
    const ref = firebase.database().ref(path);
    await ref.once('value', (snap) => {
      result.push(snap.val());
    });
  } catch (error) {
    const myRef = firebase.database().ref('errors');
    const errorData = {
      error,
    };
    myRef.push(errorData);
    throw error;
  }
  return result;
}

export { getData };
