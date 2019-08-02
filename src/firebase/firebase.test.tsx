import firebase from 'firebase';
import { addSkill, getSkills, removeSkill } from './firebase';

const testUid = '123456';
const mockInit = jest.spyOn(firebase, "auth");
const testSkill = {
    achievedHours: 0,
    description: "2313123131",
    name: "test12234",
    startDate: 1564588800000,
    targetHours: 1334
};

mockInit.mockImplementation(() => {
    return { currentUser: { uid: testUid } } as firebase.auth.Auth;
});

afterAll(async () => {
    await firebase.database().ref(`users/${testUid}`).remove();
})

it('initializes app correctly', () => {
    expect(firebase.apps.length).toEqual(1);
});

it('adds and removes skill from firebase correctly', async () => {
    await addSkill(testSkill);
    await addSkill(testSkill);
    await getSkills().then(async (result) => {
        expect(result.length).toEqual(2);
        expect(result[0][1]).toEqual(testSkill);
        await removeSkill(result[0][0])
        await getSkills().then((result) => {
            expect(result.length).toEqual(1);
        });
        await removeSkill(result[1][0]).then(async () => {
            await getSkills().then((result) => {
                expect(result.length).toEqual(0);
            });
        });
    });
});
