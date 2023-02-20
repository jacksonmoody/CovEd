import React from "react";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";

import Section from "../../components/Section";
import ImText from "../../components/TextandImage";
import Layout from "../../components/Layout";

import LinesBackground from "./LinesBackground";

import { COLORS, FONTS } from "../../constants";

// Images
import art from "./img/art.svg";
import classroom from "./img/classroom.svg";
import community from "./img/community.svg";
import cs from "./img/cs.svg";
import eco from "./img/economics.svg";
import free from "./img/free.svg";
import history from "./img/history.svg";
import lang from "./img/languages.svg";
import math from "./img/math.svg";
import mentoring from "./img/mentoring.svg";
import music from "./img/music.svg";
import science from "./img/science.svg";
import testPrep from "./img/testPrep.svg";
import writing from "./img/writing.svg";
import step1 from "./img/step1.svg";
import step2 from "./img/step2.svg";
import step3 from "./img/step3.svg";

const Circle = styled.div`
    height: 20px;
    width: 20px;
    background-color: ${COLORS.yellow};
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
`;

const HomeWrapper = styled.div`
  text-align: center;
`;
const HomepageSection = styled.section`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 90vh;
  position: relative;
  overflow: hidden;
`;
const HomepageTitle = styled.h1`
  font-size: min(7vw, 84px);
  font-family:${FONTS.font1};
  margin: 0;
  color: ${COLORS.darkblue};
  font-weight: 700;
  span {
    font-weight: 400;
  }
  letter-spacing: -0.16px;
  font-feature-settings: 'pnum' on, 'lnum' on;
`;
const HomepageSubtitle = styled.p`
  font-size: min(3vw, 24px);
  font-weight: 400;
  font-family:${FONTS.font2};
  color: ${COLORS.darkblue};
`;
const HomepageBody = styled.div`
  p{
    font-family: ${FONTS.font2};
    font-weight: 300;
  }
  h2 {
    font-family: ${FONTS.font1};
    font-weight: 500;
  }
  span {
    font-size: min(3.5vw, 24px);
    font-weight: 400;
    font-family: ${FONTS.font2};
  }
  p.title {
    font-size: max(1.5vw, 18px);
    font-weight: 400;
    font-family: ${FONTS.font2};
    color: ${COLORS.darkblue};
  }
  p.desc {
    font-size: max(1vw, 16px);
    font-weight: 300;
    font-family: ${FONTS.font2};
    color: ${COLORS.darkblue};
  }
  @media (min-width: 768px){
    p.title{
      text-align: left;
    }
    p.desc{
      text-align: left;
      color: ${COLORS.darkblue};
    }
  }
`;

const howItWorks = [
  {
    key: 1,
    step: "home.howItWorks.step1",
    imgsrc: step1
  },
  {
    key: 2,
    step: "home.howItWorks.step2",
    imgsrc: step2
  },
  {
    key: 3,
    step: "home.howItWorks.step3",
    imgsrc: step3
  }
]

const Subjects = [
  {
    key: "padding",
    text: "padding-row-1-start"
  },
  {
    key: 1,
    row: 1,
    imgsrc: writing,
    text: "home.subjects.Writing"
  },
  {
    key: 2,
    row: 1,
    imgsrc: math,
    text: "home.subjects.Math"
  },
  {
    key: 3,
    row: 1,
    imgsrc: science,
    text: "home.subjects.Science"
  },
  {
    key: 4,
    row: 1,
    imgsrc: history,
    text: "home.subjects.History"
  },
  {
    key: 5,
    row: 1,
    imgsrc: cs,
    text: "home.subjects.ComputerScience"
  },
  {
    key: "padding",
    text: "padding-row-1-end"
  },
  {
    key: "padding",
    text: "padding-row-2-start"
  },
  {
    key: 6,
    row: 2,
    imgsrc: eco,
    text: "home.subjects.Economics"
  },
  {
    key: 7,
    row: 2,
    imgsrc: music,
    text: "home.subjects.Music"
  },
  {
    key: 8,
    row: 2,
    imgsrc: art,
    text: "home.subjects.Art"
  },
  {
    key: 9,
    row: 2,
    imgsrc: lang,
    text: "home.subjects.Languages"
  },
  {
    key: 10,
    row: 2,
    imgsrc: testPrep,
    text: "home.subjects.testPrep"
  },
  {
    key: "padding",
    text: "padding-row-2-end"
  }
]

const NewsSites = [
  {
    key: "padding",
    text: "padding-row-1-start"
  },
  {
    key: 1,
    row: 1,
    imgsrc: "https://www.teachingforchange.org/wp-content/uploads/2020/10/Boston-Globe-Logo.png",
    text: "Boston Globe",
    link: "https://www.bostonglobe.com/2020/05/05/lifestyle/online-tutoring-program-pairs-students-with-college-mentors-keeping-both-engaged-while-schools-are-closed/"
  },
  {
    key: 2,
    row: 1,
    imgsrc: "https://thetech.com/assets/logo@2x-9253509ed2b9d70f7d7d3be80a9a6e9ac90ab1640de33e0bfbc1d48db3a2d2bd.png",
    text: "MIT Tech",
    link: "https://thetech.com/2020/04/08/coved-becomes-reality"
  },
  {
    key: 3,
    row: 1,
    imgsrc: "https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2017/07/26/150944_1323621.png.985x1000_q95_crop-smart_upscale.png",
    text: "Harvard Crimson",
    link: "https://www.thecrimson.com/article/2020/4/14/harvard-coronavirus-k12-volunteer-tutors/"
  },
  {
    key: 4,
    row: 1,
    imgsrc: "data:image/png;base64,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",
    text: "Good Morning America",
    link: "https://www.goodmorningamerica.com/family/story/distance-learning-hacks-back-school-affordable-educational-resources-72299408"
  },
  {
    key: "padding",
    text: "padding-row-1-end"
  },
  {
    key: "padding",
    text: "padding-row-2-start"
  },
  {
    key: 1,
    row: 2,
    imgsrc: "data:image/jpeg;base64,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",
    text: "Clinton Foundation",
    link: "https://www.clintonfoundation.org/press-releases/clinton-foundation-announces-100000-funding-student-projects-fight-covid-19-pandemic?fbclid=IwAR15iso_fp4a0FD_aLsdKLX8lKb-4W-z9e7nDPeo26vw8C6wNVKn-Jeg-BI"
  },
  {
    key: 2,
    row: 2,
    imgsrc: "data:image/png;base64,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",
    text: "Brown Daily Herald",
    link: "https://www.browndailyherald.com/article/2020/05/college-students-offer-support-for-k-12-students-in-time-of-crisis"
  },
  {
    key: 3,
    row: 2,
    imgsrc: "https://pbs.twimg.com/profile_images/828118030605381636/G3wb0UIB_400x400.jpg",
    text: "Stanford Daily",
    link: "https://www.stanforddaily.com/2020/06/29/coveducation-makes-impact-on-kids-after-school-closure/"
  },
]

const WhyJoin = [
  {
    key: 1,
    title: "home.whyJoin.mentoringTitle",
    desc: "home.whyJoin.mentoring",
    imgsrc: mentoring
  },
  {
    key: 2,
    title: "home.whyJoin.communityTitle",
    desc: "home.whyJoin.community",
    imgsrc: community
  },
  {
    key: 3,
    title: "home.whyJoin.classroomTitle",
    desc: "home.whyJoin.classroom",
    imgsrc: classroom
  },
  {
    key: 4,
    title: "home.whyJoin.freeTitle",
    desc: "home.whyJoin.costFree",
    imgsrc: free
  }
]

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <HomeWrapper>
        <HomepageSection style={{ width: "100%" }}>
          <LinesBackground />
          <div>
            <HomepageTitle>CovEd<span>ucation</span></HomepageTitle>
            <HomepageSubtitle>{t("home.subtitle")}</HomepageSubtitle>
          </div>
        </HomepageSection>
        <HomepageBody>
          <Section p="5vw">
            <h2>{t("home.whyBePartOfCovEd")}</h2> <br /><br />
            <Grid container direction="row" justifyContent="center" spacing={6}>
              {WhyJoin.map((s) => {
                return (
                  <Grid
                    key={s.title}
                    item sm={5}
                    xs={12}
                  >
                    <ImText arrangement="horizontal" shape="circle" img={s.imgsrc} minwidth="100px" minheight="100px">
                      <p className="title">{t(s.title)}</p>
                      <p className="desc">{t(s.desc)}</p>
                    </ImText>
                  </Grid>
                )
              })}
            </Grid>
          </Section>
          <Section backgroundColor='lightorange' p="100px">
            <h2>{t("home.howCovEdWorks")}</h2><br />
            <ol>
              <li> <p className="desc"> Mentors sign up for either <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/ZUpy1ZQD9RHmzFGn6"> individual matching and partnership mentoring</a> through the linked form. </p> </li>
              <li> <p className="desc"> Mentees sign up through <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/CtiraxebVyWJyzek8">this form.</a> </p> </li>
              <li> <p className="desc"> Our volunteer match mentors to mentees as soon as possible! </p> </li>
            </ol>
          </Section>
          <Section p="100px">
            <h2>{t("home.findTutors")}</h2> <br /><br />
            <Grid container direction="row" spacing={3} justifyContent="center">
              {Subjects.map((s) => {
                return (
                  s.key === "padding" ? (
                    <Hidden key={s.text} smDown>
                      <Grid item sm={1} />
                    </Hidden>
                  ) : (
                    <Grid key={s.text} item sm={2} xs={6}>
                      <ImText
                        arrangement="vertical"
                        shape="circle"
                        img={s.imgsrc}
                        minwidth="100px"
                        minheight="100px"
                      >
                        {t(s.text)}
                      </ImText>
                    </Grid>
                  )
                )
              })}
            </Grid>
          </Section>

          <Section p="100px" backgroundColor='lightorange'>
            <h2>Featured in:</h2> <br /><br />
            <Grid container direction="row" spacing={3} justifyContent="center">
              {NewsSites.map((s) => {
                return (
                  s.key === "padding" ? (
                    <Hidden key={s.text} smDown>
                      <Grid item sm={1} />
                    </Hidden>
                  ) : (
                    <Grid key={s.text} item sm={2} xs={6}>
                      <a href={s.link}>
                        <ImText
                          arrangement="vertical"
                          shape="circle"
                          img={s.imgsrc}
                          minwidth="200px"
                          minheight="200px"
                        >
                        </ImText>
                      </a>
                    </Grid>
                  )
                )
              })}
            </Grid>
            <br /><br />
            <h2>Our Partners:</h2> <br />
            <p>
              In the past, we have partnered with <a target="_blank" rel="noopener noreferrer" href="https://www.sd170.com/">Chicago Heights School District</a>, <a target="_blank" rel="noopener noreferrer" href="https://www.meusd.org/">Mountain Empire Unified School District</a>, <a target="_blank" rel="noopener noreferrer" href="https://www.cumbrehumboldt.org/">Cumbre Humboldt</a>, <a target="_blank" rel="noopener noreferrer" href="https://ccmnyc.org/mental-health-services/safe-brothers-arms/">SIMBA/ASET</a>, and <a target="_blank" rel="noopener noreferrer" href="">Bridges2Science</a> to provide tutoring to students in need. If you are interested in partnering with us, please <Link href='/contactus'> contact us</Link>!
            </p>
          </Section>

          <Section backgroundColor='lightblue' p="100px">
            <h2>{t("home.questions")}</h2>
            <p>
              <Trans i18nKey="home.questionsans">
                Check out our <Link href='/faqs'> FAQs page </Link> to see if we've already answered your question or <Link href='/contactus'> Contact Us </Link>!
              </Trans>
            </p>
          </Section>
        </HomepageBody>
      </HomeWrapper>
    </Layout>
  )
}

export default HomePage;
