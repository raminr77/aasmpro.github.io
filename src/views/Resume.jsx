import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { LinkButtonName, LinkButton } from "../components/LinkButton";
import { DetailButton } from "../components/DetailButton";
import {
  aboutMeTranslations,
  experiencesTranslations,
  skillsTranslations,
} from "../data";
import { useTranslation } from "../utils/useTranslation";
import { ContactBox } from "../components/ContactBox";

const DetailComponent = ({ title, data = [], isBtn }) => {
  if (!data?.length) return null;
  if(isBtn) {
    return (
      <div className="flex flex-row flex-wrap">
        {data.map(({href, title}, index) => (
          <LinkButton
            key={title+index}
            className="px-3 py-0.5 mx-1 my-1 font-bold print:text-light-0 print:text-sm print:px-2 print:py-0"
            bgColor="bg-blue-0"
            ringColor="ring-blue-0"
            href={href}
            text={title}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-2 mb-2 print:text-sm text-justify">
      <p className="font-bold">{title}</p>
      <ul className="list-disc pl-4">
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
};

const ToggleLanguageBtn = ({ translation }) => {
  return (
    <span
        className="mr-2 py-0.5 rounded-full text-dark-0 overflow-hidden
    transition duration-300  hover:bg-black hover:ring-2 hover:ring-light-1 cursor-pointer"
        onClick={translation.toggle}>
        <span
          className={`text-dark-0 px-1.5 py-0.5 transition duration-300 rounded-l-full ${
            translation.isEnglish
              ? "bg-light-1"
              : "text-light-0 bg-dark-0"
          }`}>
          EN
        </span>
        <span
          className={`text-dark-0 px-1.5 py-0.5 transition duration-300 rounded-r-full ${
            translation.isGerman
              ? "bg-light-1"
              : "text-light-0 bg-dark-0"
          }`}>
          DE
        </span>
      </span>
)
};

export const Resume = () => {
  const translation = useTranslation();
  const [showDetails, setShowDetails] = useState(true);
  const [aboutMe, setAboutMe] = useState(translation.get(aboutMeTranslations));
  const [experiences, setExperiences] = useState(
    translation.get(experiencesTranslations)
  );
  const [skills, setSkills] = useState(translation.get(skillsTranslations));

  useEffect(() => {
    setAboutMe(translation.get(aboutMeTranslations));
    setExperiences(translation.get(experiencesTranslations));
    setSkills(translation.get(skillsTranslations));
  }, [translation]);

  return (
    <div className="md:w-4/5 w-full print:w-full flex flex-col mx-auto print:pb-0 pb-20">
      <div className="mb-5 p-4 border-dark-0 border-b-2 print:hidden flex justify-between flex-wrap">
        <LinkButtonName
          name="Home"
          text={translation.get("Home")}
          title={translation.get("Home")}
          useIcon={false}
          className="px-3 py-0.5 text-dark-0 hover:text-light-0"
          useLinkComponent={true}
        />
        <div>
          <ToggleLanguageBtn translation={translation} />
          <DetailButton 
            show={showDetails}
            onClick={() => setShowDetails(state => !state)} 
          />
          <Link
            className="ml-2 px-3 py-0.5 bg-yellow-0 rounded-full transition duration-300 hover:bg-black hover:ring-2 hover:ring-yellow-0"
            to={`/RossAmiri.${translation.isEnglish ? 'EN' : 'DE'}.pdf`}
            target="_blank">
            Download
          </Link>
        </div>
      </div>

      <div className="px-5 print:!p-0 divide-y-2 divide-dark-0">
        <div className="pb-4 flex flex-col justify-between md:flex-row print:flex-row">
          <div>
            <h1 className="print:text-4xl text-4xl font-bold">
              Ross Amiri
            </h1>
            <p className="print:text-2xl text-2xl">{aboutMe.title}</p>
          </div>
          <div className="flex flex-col print:text-sm whitespace-nowrap mt-5 md:mt-0 print:mt-0">
            {["Webpage", "Email", "Phone"].map((name) => (
              <div className="mb-2 print:mb-1.5">
                <LinkButtonName
                  name={name}
                  className={`block max-w-[295px] px-3 py-0.5 font-bold print:text-light-0 ${
                    name === "Webpage" ? "print:bg-black" : ""
                  }`}
                  iconClassName="text-light-0 mr-3"
                />
              </div>
            ))}
            <ContactBox useIcon />
          </div>
        </div>
        <div className="py-4 print:text-sm">
          <p className="mb-3 print:text-xl text-2xl font-bold">
            {translation.get("aboutMe")}
          </p>
          <div className="text-justify">
            {aboutMe.cover.map((line) => (
              <span> {line}</span>
            ))}
            {/* {showDetails ? (
              <ul className="print:text-xs list-disc pl-4 pt-2 grid md:grid-cols-2 print:grid-cols-2">
                {aboutMe.info.map((info) => (
                  <li>{info}</li>
                ))}
              </ul>
            ) : null} */}
          </div>
        </div>
        <div className="py-4 print:text-sm">
          <p className="mb-3 print:text-xl text-2xl font-bold">
            {translation.get("skills")}
          </p>
          <p className="mb-2">{skills.title}</p>
          <ul className="list-disc pl-4 grid sm:grid-cols-2 md:grid-cols-3 print:grid-cols-3">
            {skills.data.map((skill) => (
              <li>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="py-4 print:text-sm">
          <p className="mb-3 print:text-xl text-2xl font-bold">
            {translation.get("experiences")}
          </p>
          <div>
            {experiences
              .filter((exp) => exp.showExperiences)
              .map((exp) => (
                <div
                  className={`py-2 first:pt-0 ${
                    exp.showExperiencesPrint ? "" : "print:hidden"
                  }`}>
                  <div className="flex justify-between">
                    <div>
                      <p className="print:text-lg text-lg font-semibold">
                        {exp.title}
                      </p>
                      <p className="print:text-base font-semibold">
                        {exp.company}
                      </p>
                      <div className="whitespace-nowrap sm:hidden print:hidden">
                        <p className="print:text-xs text-sm font-semibold">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="print:text-xs text-sm font-semibold">
                          {exp.location}
                        </p>
                        <p className="print:text-xs text-sm font-semibold">
                          {exp.type}
                        </p>
                      </div>
                      <div className="print:text-xs text-sm">
                        {exp.stack.map((stack) => (
                          <span className="text-green-1 print:text-green-0 font-semibold">
                            {stack},{" "}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap hidden sm:block print:block">
                      <p className="print:text-xs text-sm font-semibold">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      <p className="print:text-xs text-sm font-semibold">
                        {exp.location}
                      </p>
                      <p className="print:text-xs text-sm font-semibold">
                        {exp.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 mb-2 text-justify">
                    {exp.about.map((line) => (
                      <span>{line}</span>
                    ))}
                  </div>

                  {showDetails && (
                    <>
                      <DetailComponent data={exp.links} isBtn/>
                      <DetailComponent title={exp.responsible} data={exp.responsibilities} />
                      <DetailComponent title={exp.contribution} data={exp.contributions} />
                      <DetailComponent title={exp.achievement} data={exp.achievements} />
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
