import { get } from "./base";
const token = localStorage.getItem("token") || "";
export const getLessons = async () => {
  const endpoint = "v3.0/mobile/lesson-ios";
  try {
    const res = await get(endpoint, {
      params: {
        course_id: 1,
        page: 1,
        // offset: 350,
        offset: 100,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data?.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getQuestionInLesson = async (lesson_id) => {
  const endpoint = "v3.0/mobile/question";
  try {
    const res = await get(endpoint, {
      params: {
        lesson_id: lesson_id,
        user_token: token,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data?.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
