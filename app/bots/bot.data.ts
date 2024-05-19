import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed to answer my question. Compose an executive summary for a grant proposal focusing on Improving Minority Health and Eliminating Health Disparities as defined as the problem below.
	•	Research Objectives:
	•	Physical Barriers – Factors such as proximity to healthcare facilities and transportation may limit access to healthcare
	•	Infrastructure Barriers - Health providers, such as rural health clinics, federally qualified health centers, and critical access hospitals, may not have the same resources and expertise of large hospitals and health networks
	•	Economic Barriers - Lack of public and private insurance coverage or financial resources
	•	Specific Areas of Research Interest:
	•	Facilitate or enhance disease self-management, patient-healthcare provider, or system communication, and/or care coordination between primary care providers, family care givers, hospital emergency department staff, specialty physicians, dental health professionals, nurse practitioners, providers of mental health and behavioral health services, patient navigators, etc., in medically underserved communities and regions
	•	Detecting, measuring, and assessing a broad array of unhealthy social and environmental exposures (discrimination, stress, pollutants, allergens, noise, crime, etc.), and for characterizing cumulative exposures across multiple individuals and communities and linking this information to physiological responses and health indicators at the individual and population levels. These technologies may include efforts to improve and standardize data collection and the integration of social determinants of health (SDOH) and other data across disparate data sources, including clinical patient data, electronic medical records, public health data, census data, housing data, employment data, and crime statistics.
	•	mMobile health (mHealth) and telehealth/telemedicine technologies and apps for improving communication among health care providers and between patients, families, and physicians and healthcare providers, medication adherence, diagnosis, monitoring, evaluation, medical management, screening, tracking, and treatment in underserved community settings and rural and remote locations.
	•	Using systems modeling, artificial intelligence, or other techniques to predict relationships between health disparities and health determinants and to assess health disparities interventions outcomes
`;

type DemoBot = Omit<Bot, "session">;

export const DEMO_BOTS: DemoBot[] = [
  {
    id: "2",
    avatar: "1f916",
    name: "Medaica Nenad",
    botHello: "Hello Nenad! How can I help you?",
    context: [
      {
        role: "system",
        content: TEMPLATE("grant writer"),
      },
    ],
    modelConfig: {
      model: "gpt-4o",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    datasource: "medaica",
    hideContext: true,
  },
];

export const createDemoBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  DEMO_BOTS.forEach((demoBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(demoBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: false,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
