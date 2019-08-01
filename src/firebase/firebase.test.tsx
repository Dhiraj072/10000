import firebase from 'firebase';
import { addSkillToFirebase } from './firebase';

it('initializes app correctly', () => {
    expect(firebase.apps.length).toEqual(1);
});

it('adds skill to firebase correctly', async () => {
    await addSkillToFirebase({
        achievedHours: 0,
        description: "2313123131",
        name: "test12234",
        startDate: 1564588800000,
        targetHours: 1334
    });
});



