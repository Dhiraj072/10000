import firebase from 'firebase';
import { addSkill, getSkills, removeSkill, updateSkill } from './firebase';

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

afterEach(async () => {
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

it ('updates firebase skill correctly', async () => {
    await addSkill(testSkill);
    await getSkills().then(async (result1) => {
        const storedSkillId = result1[0][0];
        const storedSkill = result1[0][1];
        expect(storedSkill).toEqual(testSkill);
        storedSkill.achievedHours = 12;
        await updateSkill(storedSkillId, storedSkill);
        await getSkills().then(async (result2) => {
            expect(result2[0][1].achievedHours).toEqual(12);
        })
    })
})
