import { FaCss3Alt, FaDatabase, FaHtml5, FaJava } from "react-icons/fa";
import { SiExpress, SiFigma, SiGit, SiGithub, SiJavascript, SiMiro, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPostgresql, SiReact, SiSpringboot, SiTailwindcss, SiTrello, SiTypescript } from "react-icons/si";

export const stackGroups = [
  { title: { pt: "Frontend", en: "Frontend" }, items: [["React", SiReact], ["Next.js", SiNextdotjs], ["Tailwind CSS", SiTailwindcss], ["HTML5", FaHtml5], ["CSS3", FaCss3Alt]] },
  { title: { pt: "Backend", en: "Backend" }, items: [["Node.js", SiNodedotjs], ["Express", SiExpress], ["Spring Boot", SiSpringboot], ["Java", FaJava]] },
  { title: { pt: "Linguagens", en: "Languages" }, items: [["JavaScript", SiJavascript], ["TypeScript", SiTypescript], ["Java", FaJava], ["SQL", FaDatabase]] },
  { title: { pt: "Banco de dados", en: "Databases" }, items: [["MySQL", SiMysql], ["PostgreSQL", SiPostgresql], ["MongoDB", SiMongodb]] },
  { title: { pt: "Ferramentas", en: "Tools" }, items: [["Git", SiGit], ["GitHub", SiGithub], ["Figma", SiFigma], ["Trello", SiTrello], ["Miro", SiMiro]] },
] as const;

export const certs = [
  { name: "Introdução a Java", org: "Alura", extra: "" },
  { name: "Engenharia de Prompt", org: "Rocketseat", extra: "" },
  { name: "ServiceNow Developer", org: "SkillUp & edX", extra: "25h" },
  { name: "Lógica de Programação", org: "Alura", extra: "" },
];
