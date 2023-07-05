import {Configuration, OpenAIApi} from "openai";

export default async function gSurvey(topic) {
    console.log(import.meta.env.VITE_OPENAI_KEY)
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);
const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "user", content: `i need to create a survey about the ${topic} and i need you to create the title and questions of the survey, up to 6 posible answers, the whole survey should follow the following format: {survey_title: title_text, questions: {title: title_text, items: ['item_a', 'item_b'... etc] }}, do not put any extra information like the number of the question, just follow the format, like it is a json also any spaces or multiple lines  in the answers` },
        
    ]
    });
    console.log(chat_completion.data.choices[0].message.content)
    const object = JSON.parse(chat_completion.data.choices[0].message.content)
    const myModel = {title: object.survey_title, questions: []}
    for (let i = 0; i < object.questions.length; i++) {
        myModel.questions.push({q: object.questions[i].title, pa: object.questions[i].items.map(x => {
            return {a: x, t: 0}
        })
        })
    }
        
    return myModel
}