
## Table of Contents


- Chapter 1: Introduction
- 1.1 Introduction
- 1.2 Problem Statement
- 1.3 Motivation
- 1.4 Project Objectives
- 1.4.1 Specific Objectives .....................................................
- 1.4.2 Non-Functional Objectives
- 1.5 Project Scope
- 1.6 Project Timeline
- Chapter 2: Literature Review
- 2.1 Educational Challenges in Egypt
- 2.2 Theoretical Background
- 2.3 Related Work
- Chapter 3: System Analysis & Requirements
- 3.1 Business Model Strategy
- 3.2 SWOT Analysis
- 3.3 System Requirements
- 3.5 Use Case Modeling
- 3.6 Process Modeling
- Chapter 4: System Design
- 4.1 System Architecture
- 4.2 Database Design (ERD)
- 4.3 Structural Design (Class Diagram)
- Figure 2.1 Comparison Between Educational Platforms List of Figures
- Figure 2.2 Conceptual Framework
- Figure 3.1 Business Model Canvas
- Figure 3.2 SWOT Analysis of Eureka Platform
- Figure 3.5 Use Case Diagram
- Figure 3.6.1 Student Navigation & Learning Flow
- Figure 3.6.2 Interactive Solving & Feedback Loop
- Figure 3.6.3 Teacher Classroom Management Workflow
- Figure 3.6.4 Content Authoring & Assessment Creation
- Figure 4.1 High-Level System Architecture
- Figure 4.2 Entity Relationship Diagram (ERD)
- Figure 4.3 Class Diagram


# Eureka - ریكَ ُی

# AI Driven Interactive Self-Learning and

# Assessment Platform.

# منصة تعليم ذاتي تفاعلية و اختبارات الكترونية

# مدعومة بالذكاء الالاصطناعي.

## Chapter 1

## 1.1 Introduction

The right to free and accessible education is considered a human right under Article 26 of the Universal
Declaration of Human Rights[1]. Yet the article does not specify the quality of education given. Many nations,
especially those with limited resources, allocate the minimum needed to maintain public schools. As a result,
schools are usually uninviting to students, teachers don’t get paid enough and have little incentive to work and
teach, and the education system, rather than producing a mind capable of critical thinking and problem solving,
produces a mind that knows what it learned but not how to use it.

Globally, there is a clear pattern linking national wealth to educational quality.[2] Take Finland, the
Netherlands, and the United States as examples. They consistently manage to stay on top of education rankings
and produce some of the most skilled people and researchers in the world. On the other hand, nations with less
wealth struggle to provide the same level of educational opportunities to their citizens, and even those who
manage to access high-quality education often travel abroad to wealthier nations, contributing to what is known
as “brain drain.”[3]

China, despite being far less wealthy in previous decades, invested heavily in education as a strategic national
priority. Over time, the country transformed its massive human capital from a burden into a key economic and
developmental engine.[2], [4] This shows that even countries with limited resources can invest in education and
develop significantly, but not every nation has the capability to follow this path. Countries dealing with other
priorities or debt often find it difficult to allocate enough funds to education.


Egypt faces a problem with parallel education systems such as private tutoring, which is usually very expensive
for most Egyptians. Many teachers don’t perform their job well at school but instead rely heavily on private
tutoring to make enough income. Over time, private tutoring has become a central and costly part of education,
putting pressure on families and reducing the effectiveness of formal schooling. Students and parents are
conditioned to believe that tutoring is necessary to achieve good grades, and the lack of alternative options has
created a kind of monopoly around it.[5], [6]

Improving the quality of education in Egypt is becoming more urgent every year. Families are spending more
than they can afford, students are relying on tutoring instead of actual learning, and the gap between those who
can pay and those who cannot keeps growing.

Traditional methods alone are no longer enough, especially with crowded classes, limited school resources, and
the increasing financial pressure on teachers. There is a clear need for new approaches that can support students
in a more flexible and affordable way while still giving them a real chance to understand, practice, and build
skills without depending on private tutoring.

The next section discusses the main problems in the current system and the specific issues this project aims to
address.

The current educational landscape in Egypt faces critical challenges that hinder effective learning and student
development. These challenges can be categorized into three main dimensions:

**1. Pedagogical Challenges (Rote Learning vs. Understanding):** The education system relies heavily on rote
memorization aimed solely at passing final exams rather than fostering deep understanding. Students are
conditioned to memorize model answers, leading to a lack of critical thinking and problem-solving skills.
Furthermore, the traditional "cramming" culture results in the rapid decay of knowledge shortly after exams, a
phenomenon known as the "forgetting curve".
**2. Economic and Social Challenges (The Tutoring Burden):** Due to overcrowded classrooms and limited
resources in public schools , families are forced to rely on private tutoring as a necessary parallel system. This
places a significant financial burden on Egyptian households and creates educational inequality, where high-
quality personalized instruction is only accessible to those who can afford it.
**3. Technological Gaps (Lack of True Interactivity):** While digital platforms exist, most rely on passive
learning methods—such as watching static videos or reading text—which create an "illusion of competence"
without ensuring the student can apply the knowledge. There is a distinct lack of platforms that combine
curriculum alignment with active, constructivist learning tools (like interactive simulations) and automated
retention systems (spaced repetition) in a single ecosystem.

## 1.2 Problem Statement


## 1.3 Motivation

The motivation behind developing **Eureka** stems from a critical need to bridge the widening gap between the
rising costs of private education and the accessibility of high-quality learning resources in Egypt. While private
tutoring creates a "pay-to-learn" barrier, technology offers a scalable solution to democratize access to
personalized education.

## 1.4 Project Objectives

## 1.4.1 Specific Objectives .....................................................

```
Maximize Long-Term Memory Retention:
```
Furthermore, we are witnessing a shift in how students consume information. Traditional passive methods
(lectures and textbooks) are struggling to engage a digital-native generation. The motivation, therefore, is not
merely to digitize the curriculum, but to **transform** the learning experience from **passive memorization to
active** , intuition-based problem solving.

By leveraging modern **Artificial Intelligence and spaced repetition algorithms** , this project seeks to provide
every student— **regardless of their financial background** —with a " **personal tutor** " experience. The ultimate
goal is to alleviate the financial burden on Egyptian families while producing a generation of students who
**truly understand** the material rather than just memorizing it for an exam

The primary objective of Eureka is to develop a smart, adaptive self-learning ecosystem tailored specifically for
the Egyptian educational context. Unlike traditional platforms that digitize textbooks, Eureka aims to
**transform** the learning process by shifting the focus from rote memorization to deep, intuitive understanding.
The project seeks to achieve this through three main pillars:

1. **Personalized Retention:** Utilizing AI-driven spaced repetition to combat memory decay.
2. **Interactive Comprehension:** replacing static questions with dynamic, interactive nodes that test the
    "why" and "how."
3. **Unified Ecosystem:** Bridging the gap between self-study and institutional education by providing robust
    tools for teachers.

```
Implement an automated Spaced Repetition System (SRS)
thatdynamically schedules reviews based on individual student performance, ensuring knowledge is
transferred from short-term to long-term memory.
Foster Intuitive Problem Solving: Develop an interactive questioning engine (Interactive Nodes) that
requires students to manipulate variables and construct answers, thereby building intuition rather than
relying on memorized patterns.
Enhance Student Engagement: Utilize "White Hat" gamification mechanics (points, mastery levels) to
motivate students intrinsically without fostering addictive behaviors or anxiety.
Provide Intelligent Remediation: Integrate an AI-powered tutor (Chatbot) to provide instant, context-
aware explanations for mistakes, ensuring students receive immediate feedback during their study sessions.
```

## 1.4.2 Non-Functional Objectives

```
Usability & User Experience (UX):
```
```
Accessibility & Localization:
```
```
Empower Educators: Create a comprehensive "Teacher Dashboard" that allows instructors to construct
interactive lessons, exercises, and exams using the same framework available to students.
Ensure Academic Integrity: Develop a secure exam environment equipped with basic AI proctoring
capabilities to minimize cheating and ensure fair assessment in online settings.
```
The scope of this project is to design and develop a **Web-Based Minimum Viable Product (MVP)** for the
Eureka platform, targeting the Egyptian high school curriculum and Computer Science fundamentals. The
prototype aims to validate the technical feasibility and pedagogical effectiveness of the proposed system
through the following core components:

```
Adaptive Learning Engine: Implementation of Spaced Repetition Systems (SRS) and adaptive
algorithms to generate questions based on student performance.
Interactive Content & Gamification: Development of an interactive questioning framework and lesson
explanations (text/video), integrated with gamification elements to enhance student engagement and
retention.
Teacher & Classroom Management: A comprehensive module allowing instructors to create virtual
classes, author interactive lessons, assign exercises, and track progress.
Secure Assessment Environment: A dedicated online examination interface utilizing AI proctoring
techniques to ensure academic integrity and minimize cheating.
```
**Constraint:** The project focuses on building the **software architecture and interactive mechanisms** rather
than producing a complete library of educational content for all subjects. The prototype will serve as a proof-of-
concept to demonstrate how these features can theoretically improve learning outcomes.

```
Provideadistraction-free, intuitive interface that minimizes cognitive
load,allowingstudents to focusentirely onthelearning material.
```
```
Support afully bilingual interface (Arabic and English) to ensure the
platformisaccessible to students across different educational systems (National and International) within
Egypt.
Economic Accessibility: Design the system architecture to support a cost-effective operation model
(Freemium), making high-quality personalized education affordable for the average Egyptian family.
Ethical Design: Maintain a "Calm Gamification" approach that encourages consistent study habits without
using predatory psychological tactics (like fear of missing out or aggressive streaks).
```
## 1.5 Project Scope


## 1.6 Project Timeline


## Chapter 2: Literature Review

## 2.1 Educational Challenges in Egypt

Education in Egypt has been suffering due to the same problems for decades, and most of them are directly tied to
how the system works in practice. Even though education is technically free and accessible, the quality of the
learning experience is far from equal for most students. Public schools struggle with overcrowded classrooms,
limited resources, and a curriculum that leans heavily toward memorization instead of real understanding.
Teachers are often expected to manage classrooms with 40–50 students and outdated materials, which makes
proper teaching almost impossible.

For many school teachers in Egypt, the reality is that salaries have not kept up with the rising cost of living.
Without enough income to support their families, many educators are forced to look for other ways to make
ends meet. As a result, private tutoring has become the standard solution, with nearly every teacher and even
some unlicensed individuals offering lessons at various price points.

This tutoring market generally splits into two categories based on what a family can afford:

Private and Small-Group Sessions The most effective option is private tutoring, where a student works one-on-
one with a teacher. This allows the teacher to personalize the learning experience that satisfies the student's
needs while giving them as much attention as possible. However, this personalized experience is expensive and
out of reach for most Egyptian families. To make this more affordable, students often form small groups with
friends, splitting the cost of the tutoring fee while still getting some level of personal attention.

Public Tutoring Centers Students who cannot afford private sessions usually resort to "centers" or public
tutoring classes. These are often large lecture halls packed with students, resembling a crowded school
classroom more than a private lesson. In these centers, teachers explain the material, assign homework, and give
exams which are tasks they are supposed to do in school. However, because the pay from these centers is
significantly higher than their salary, teachers naturally invest more energy and effort into these paid sessions
than their regular school classes.[6]

One of the biggest challenges in public education in Egypt is the sheer number of students inside each classroom.
Many government schools operate far beyond their intended capacity. It’s not uncommon to find 40, 50, or even
more students squeezed into one room, making it nearly impossible for teachers to give personal
attention to anyone. The classroom environment becomes noisy, crowded, and uncomfortable, and most
teachers end up explaining the lesson once and hoping that everyone understood.

**2.1.1 The Phenomenon of Tutoring**

**2.1.2 Overcrowded Classrooms & Under-Resourced Schools**


This structural limitation highlights a critical gap: teachers cannot physically track the learning gaps of 50
students simultaneously.

Furthermore, schools suffer from severe resource shortages, lacking functioning labs, libraries, and modern
technology. Consequently, instruction is confined to traditional methods, preventing teachers from providing
the differentiated support many students need to succeed.

Although education is supposedly free in Egypt, most families find it to be very costly. A significant amount of
the average household income is spent on tutoring, particularly during the last years of education. Families
frequently believe they have no choice but to spend more than they can afford because the educational system is
insufficient to guarantee high grades.

There is a significant divide between the students as a result. Individualized explanations and practice are
provided to those who can afford private tutoring. People who can't afford it frequently rely solely on packed
schools and public tutoring facilities, which puts them at a disadvantage.

This inequality ends up affecting students’ confidence, performance, and opportunities later in life. It
perpetuates a cycle in which academic achievement is determined by financial capacity.

The system's reliance on a single final exam is another issue. Students learn early on that the goal of education is
to memorize the material required to pass the final exam rather than to comprehend. Instead of teaching students
how to think, teachers frequently drill them with model answers under pressure from the system and
parents' expectations.

As a result, many students graduate from school lacking genuine problem-solving abilities and self-assurance.
Instead of learning "why" the answer is right, they learn "what" it is. There is very little opportunity for
creativity, critical thinking, or curiosity in this method. Learning becomes a stressful routine rather than
something meaningful when the entire year is focused on memorization.

This exam pressure is one of the reasons tutoring became such a dominant part of student life in the first place.

**This creates an urgent need for an automated system capable of providing personalized attention and
immediate feedback at scale, a role that Artificial Intelligence is uniquely positioned to fill.**

**This structural limitation highlights a critical gap: teachers cannot physically track the learning gaps of
50 students simultaneously. This creates an urgent need for an automated system capable of providing
personalized attention and immediate feedback at scale, a role that Artificial Intelligence is uniquely
positioned to fill.**

**2.1.3 Rote Learning & Exam Culture**

**2.1.4 Inequality & the Financial Burden on Families**


**2.2.1 The Forgetting Curve and Spaced Repetition**
One of the most persistent issues in the traditional Egyptian education system is the "cramming" culture. Students
often memorize massive amounts of information days before an exam, only to forget nearly all of it shortly after.
This phenomenon was first mathematically quantified by the German psychologist Hermann Ebbinghaus in 1885.
[7]

**2.1.5 Technology Gaps & Lack of Interactive Learning**
Egyptian schools still mainly rely on printed handouts and chalk-and-board explanations, even though many
other nations are embracing digital learning tools, interactive content, and contemporary teaching techniques.
Seldom do students have the opportunity to investigate ideas through simulations, visualizations, or practical
problem solving.

To address the problems outlined in the previous section, specifically rote memorization and the lack of
engagement. Eureka relies on established educational theories and cognitive science principles. The proposed
solution is not just about digitizing a textbook; it is about fundamentally changing how information is
processed, retained, and visualized by the student.

Even when learning platforms do exist, they frequently consist of collections of videos or multiple-choice
questions rather than actual interactive experiences. Students find it challenging to develop deeper
understanding or intuition as a result. When students are unable to "see" or engage with concepts, subjects like
physics, chemistry, and mathematics become even more challenging.

This disparity demonstrates the obvious need for resources that support students' learning in a more
contemporary and interesting manner.

## 2.2 Theoretical Background


Research by Cepeda et al. (2008) confirms that spacing out study sessions (distributed practice) produces far
superior long-term retention compared to massed practice (cramming), even when the total study time is the
same. By implementing spaced repetition algorithms, the platform shifts the student’s focus from short-term
storage for an exam to long-term retention for actual knowledge building.[8]

Ebbinghaus demonstrated that memory follows an exponential decay curve. Without review, learners forget
roughly 50% of new information within a day and up to 90% within a week (Ebbinghaus, 1885/1913). However,
this decay can be interrupted. By reviewing the material at increasing intervals just as the brain is
about to forget it the "forgetting curve" is flattened, and the memory is strengthened. This technique is known as
**Spaced Repetition.**

Most students instinctively study by re-reading their textbooks, highlighting notes, or watching video lectures.
While these methods feel productive, they are classified as "passive review." They create a phenomenon known
as the "illusion of competence," where a student recognizes the material and assumes they know it, but cannot
reproduce it on their own.

In contrast, Active Recall involves retrieving information from memory without looking at the source material.
This is often achieved through self-testing or answering questions before looking at the solution. Roediger and
Karpicke (2006) famously demonstrated the "Testing Effect," showing that students who studied by taking
practice tests outperformed those who simply re-studied the material, even when the re-studiers spent more time
with the content.[9]

**The Cone of Learning (Edgar Dale), illustrating that active methods like "Simulating" or "Doing" lead
to 90% retention compared to 10% for reading.**

**2.2.2 Active Recall vs. Passive Review**


Eureka leverages this by ensuring that the primary interaction is not reading, but solving. By forcing the brain to
work to retrieve the answer, the neural pathways associated with that information are strengthened significantly
more than by passive observation.

In subjects like physics, mathematics, and computer science, knowing the definition of a concept is not the same as
understanding how it works. Static text and even video lectures often fail to convey the dynamic nature of these
systems.

This project adopts a **Constructivist** approach to learning, a theory championed by Jean Piaget, which suggests
that learners construct knowledge through experience and interaction rather than just passively receiving it. In
the context of digital education, this is achieved through interactive simulations and visualizations.[10]

Research into multimedia learning supports the idea that people learn better from words and pictures than from
words alone, specifically when the learner can control the pace and manipulate the variables. By allowing
students to interact with the parameters of a problem, such as changing the mass in a physics simulation or
modifying code in a CS lesson, they develop an intuitive "feel" for the subject that static memorization cannot
provide.[11]

Finally, an educational platform is only effective if students are motivated to use it. **Gamification** is the
application of game-design elements, such as points, levels, and progress bars in non-game contexts to drive user
engagement.

However, effective gamification must go beyond simple badges. It relies on **Self-Determination Theory
(SDT)** , which posits that human motivation is driven by three needs: competence (feeling capable), autonomy
(feeling in control), and relatedness (feeling connected) [12]

In Eureka, gamification is designed to satisfy the need for competence. Instead of punishing mistakes, the
system visualizes progress and mastery. When a student sees a visual representation of their knowledge
"leveling up," it triggers a dopamine response similar to video games, but directed toward productive learning.
This keeps the student in a state of "Flow" [13], where the challenge of the material is perfectly balanced with
their current skill level, preventing both boredom and anxiety.

**2.2.4 Gamification and Motivation**

**2.2.3 Interactivity and Constructivist Learning**


## 2.3 Related Work

The landscape of digital education platforms is vast. Lots of platforms offer different ways on how to achieve
effective education.

Nagwa is a major dominant player in the Egyptian market, providing an extensive library of curriculum-aligned
content. Its strength lies in its direct relevance to national exams and high production value.

Khan Academy is the global exempla of this model, offering a vast library of high-quality, free video lessons
across STEM subjects. While excellent for initial concept introduction, its reliance on passive video
consumption does not actively combat the "illusion of competence." Students often watch a video and feel they
understand, but struggle to apply the knowledge later due to a lack of active, scaffolded practice.

**2.3.1 Traditional and Video-Based Curriculum Platforms** The dominant model in online education remains
the "digitized classroom," where traditional lectures are replaced by pre-recorded videos, followed by standard
multiple-choice questions (MCQs).

```
Nagwa
```
```
Khan Academy
```

```
Anki
```
**Critique:** However, Nagwa’s primary pedagogical model focuses on **Content Delivery** (watching videos)
followed by **Summative Assessment** (standard quizzes). While effective for practice, it lacks two critical
components that Eureka introduces:

1. **Deep Interactivity:** Students mostly select answers rather than manipulating variables to construct
    understanding (Constructivism).
2. **Automated Retention:** Nagwa does not employ a **Spaced Repetition System (SRS)** to track individual
    memory decay curves. Once a student finishes a lesson, the system does not automatically reschedule
    reviews for that specific concept based on their forgetting rate.

**2.3.2 Dedicated Spaced Repetition Systems (SRS)** Recognizing the inefficiency of cramming, several tools
focus exclusively on optimizing memory retention through the spacing effect.

Anki is considered the gold standard for spaced repetition algorithms. It is highly effective for long-term
memorization of facts, definitions, and syntax. However, Anki is a "blank slate" tool; it relies entirely on user-
generated content. Creating effective flashcards for complex subjects like physics or computer science requires
significant effort and skill from the student, creating a high barrier to entry. Furthermore, it lacks any curriculum
structure or teacher oversight.


```
Quizlet
```
**Brilliant.org**

**2.3.3 Interactive and Constructivist Platforms**

Moving beyond passive videos and simple recall, some platforms focus on building intuition through active
participation and interactivity.

Quizlet offers a more accessible entry point to digital flashcards with some gamified elements. While easier to
use than Anki, its review algorithms are generally less robust, and its primary mechanic remains "flipping
cards," which is less effective for building complex mental models than solving interactive problems.

These tools excel at _retention_ but lack the _instructional scaffolding_ necessary to teach new, complex concepts
from scratch in a structured academic setting.

Brilliant stands out for its approach to teaching STEM through interactive puzzles and guided problem-solving
rather than lectures. This builds excellent intuition and aligns well with constructivist learning theories.
However, Brilliant operates outside of standard school curricula; it teaches concepts broadly but does not prepare
students for specific national exams. It also lacks instructor-led features for classroom integration.


```
Scratch
```
```
Duolingo
```
Scratch (developed by MIT) is the prime example of constructionist learning in computer science, allowing
students to learn by building projects. While powerful for fostering creativity and basic logic, it is an open-
ended sandbox environment, lacking the structured progression, assessment metrics, and review mechanics
needed for a comprehensive self-learning platform specifically for high school curriculum obligations.

Duolingo has successfully masterminded gamified learning, using short, interactive exercises and strong
competence-based motivation (levels, streaks) to maintain engagement. While highly successful for language
learning, its format of "bite-sized," repetitive translation tasks does not translate well to deeper, hierarchical
subjects like physics or advanced algorithms, which require deeper sustained focus and complex problem
visualization.


```
Platform
```
```
Primary
Focus/
Market
```
```
Self
Learning
Approach
```
```
Curriculum
Alignment
(Egypt)
```
```
Interactivity
Level
```
```
Spaced
Repetition
(SRS)
```
```
Teacher &
Classroom
Tools
```
```
Bilingual
Support
(Ar/En)
```
```
Khan
Academy
```
```
Global K-
& Test Prep
```
```
Video
Lectures +
Standard
MCQs
```
```
No None No Yes Limited
```
```
Nagwa Egypt
```
```
Video
Lectures +
MCQs +
Online
Tutoring
```
```
Yes None No Yes Yes
```
```
Anki
```
```
Global
Lifelong
Learners
```
```
User-
Generated
Flashcards
(Memorizati
on)
```
```
No None Yes No Yes
```
```
Quizlet GlobalStudents
```
```
Digital
Flashcards
& Simple
Games
```
```
No Low Yes Yes Limited
```
```
Brilliant GlobalEnthusiasts^ STEM
```
```
Guided
Interactive
Problem
Solving
```
```
No (General
concepts
only)
```
```
High No No No
```
**2.3.4 Summary and Gap Analysis**

The review of existing platforms reveals a **fragmented landscape.**
Students in Egypt currently have to fragment their learning process: watching **video explanations** on one platform
(Nagwa/Khan), trying to **memorize facts** on another (Anki), and perhaps seeking **intuitive understanding** on a
third (Brilliant)—all while likely still paying for **private tutoring** to connect these pieces for the final exam.

There is a **clear absence of a unified platform that combines curriculum alignment**
(specifically for Egypt) with high-fidelity interactive learning mechanics (beyond simple
MCQs) and integrated spaced repetition for long-term retention. Furthermore, few
platforms effectively bridge the gap between self-learning and institutional education by
offering robust teacher tools within the same ecosystem.

**Table 2.1** summarizes comparison between major educational platforms and the proposed
Eureka system across key pedagogical and technical dimensions.

Eureka aims to fill this gap by synthesizing the strengths of these different approaches:
adopting the curriculum focus of Nagwa, the interactivity of Brilliant, the retention
mechanics of Anki, and the motivational structure of Duolingo, all within a single,
bilingual ecosystem designed for the Egyptian context.


**Scratch** GlobalCoding^ Kids

```
Constructionist
"Sandbox"
(Project building)
```
```
No Very High No Yes Yes
```
**Duolingo**

```
Global
Language
Learning
```
```
Gamified, bite-
sized exercises
```
```
No (CEFR
standards) Medium Yes Yes Yes
```
**Eureka
(Proposed)**

```
Egypt High
School &
University
```
```
Interactive
gamified
questions with
spaced repetition
```
```
Yes High Yes
```
```
Teacher
made
exams,
exercises
and
interactive
lessons
```
```
Yes
```
```
Table 2.1 summarizes comparison between major educational platforms and the proposed
Eureka system across key pedagogical and technical dimensions.
```
```
Figure 2.2: Conceptual Framework
```

## Chapter 3: System Analysis & Requirements

## 3.1 Business Model Strategy

Eureka adopts a **Freemium Business Model** to ensure both sustainability and accessibility. This strategy removes
financial barriers by offering core learning features for free, while generating revenue through premium
subscriptions (e.g., advanced AI analytics) and advertisements. This approach balances the project's
economic viability with its mission to provide affordable education for all Egyptian students.

**Figure 3.1** below illustrates the detailed Business Model Canvas.


## 3.2 SWOT Analysis

While the Business Model relies on the efficiency of the **"Cognitive Engine"** (SRS & Active Recall) as a key
differentiator, the analysis reveals critical operational hurdles, such as the **"Content Bottleneck"** —the time-
intensive nature of creating high-fidelity interactive nodes compared to traditional video content.

This assessment ensures that the system requirements (detailed in the next section) are designed not just for
functionality, but to mitigate these specific strategic risks.

**Figure 3.2** below details the Strengths, Weaknesses, Opportunities, and Threats for the Eureka platform.


## 3.3 System Requirements

**Functional Requirements**

**Authentication & User Management**

### FR1.

### FR2.

### FR3.

### FR4.

```
Student Learning Features
```
**FR5.
FR6.
FR7.
FR8.
FR9.
FR10.
FR11.
FR12.
FR13.**

```
Classroom Features
```
**FR14.
FR15.**

```
FR16.
FR17.
FR18.
```
```
FR19.
FR20.
```
```
FR21.
FR22.
```
```
Studentsshallbeabletoview lesson explanations in text, audio, video, or mixed formats.
Studentsshallbeabletochat with an AI bot while studying lesson explanations.
Studentsshallbeabletopractice exercises for each lesson.
Studentsshallberequiredto pass one or more milestone questions to unlock later lessons.
Studentsshallbeabletoskip to later lessons by completing a placement quiz.
Studentsshallbeabletotrack lesson completion.
Studentsshallbeabletotrack mistakes over time.
Studentsshallbeabletotrack review progress.
Studentsshallbeabletosearch for subjects and lessons through a search bar.
```
Usersshallbeabletoregister and log in as either teachers or students using email or third-party
authentication.
Usersshallbeabletoupdate basic profile information such as name and picture.
Usersshallbeabletologout of the system.
Usersshallbeabletoresettheir password through email.

```
Studentsshallbeabletojoin teacher-created classes.
Studentsshallbeabletosolve class-specific problems, study class materials, and take class exams.
```
Teachersshallbeabletocreate classes.
Teachersshallbeabletoadd or remove students from their classes.
Teachersshallbeabletocreate learning materials, exercises, and exams using the platform’s interactive
templates.
Teachersshallbeabletoedit or delete any lesson, exercise, or exam they have created.
Teachersshallbeabletopreview any exercise or exam before publishing it to students.

Teachersshallbeabletotrack student progress.
The systemshallprovidea decision support system (DSS) to help teachers identify weak areas and
performance trends.


```
Teacher–Student Interaction
```
**FR23.
FR24.
FR25.**

```
FR26.
```
```
Interactive Content & Learning Mechanics
```
**FR27.
FR28.
FR29.**

```
FR30.
FR31.
FR32.
```
```
Gamification & Motivation
```
**FR33.
FR34.
FR35.
FR36.**

```
Notification System
```
**FR37.
FR38.
FR39.
FR40.**

```
Exam System & Proctoring
```
**FR41.
FR42.
FR43.
FR44.**
essay.
**FR45.**

```
Thesystemshallnotifystudentswhentheyhave pending spaced-repetition reviews.
Thesystemshallnotifystudentswhenteachers post new class materials, assignments, or exams.
Thesystemshallnotifystudentsofupcoming exams or deadlines.
Thesystemshallnotifyteachersaboutstudent submissions, class activity, and performance alerts.
```
```
Thesystemshallprovideexperiencepoints, levels, and progress indicators to motivate students.
Thesystemshallawardachievementsorbadges for key milestones (mastery, completion, reviews).
Thesystemshallavoidstreak-basedpressure and keep gamification balanced and non-addictive.
Thesystemshalldisplayvisualmasteryprogression for each topic.
```
```
Thesystemshallrandomizequestionorderduring exams.
Thesystemshallprovidealockedfull-screen exam mode.
Thesystemshallpreventtabswitchingoropening new windows during exams.
Thesystemshallsupportthefollowingexam question types: MCQ, essay, interactive, and interactive-
```
```
Thesystemshallautomaticallysubmittheexam when time expires.
```
All self-learning questions shall be interactive.
Theplatformshallutilizespacedrepetitionto improve memory retention.
Theplatformshallprovidethreereviewqueues: a global queue, a subject-level queue, and a lesson-level
queue.
Theplatformshalladdclassquestionsandexam questions into review queues if the student opts in.
Reviewtimesshallbeadaptivebasedonstudent performance.
Questionsshallbeautomaticallymovedwithin the review queues based on performance.

Studentsshallbeabletochatdirectlywiththeir teacher inside the class environment.
Studentsshallbeabletocommentonteacher-posted materials.
Studentsshallbeabletoreacttoteacher-posted materials using simple reactions (e.g., like, check,
question mark).
Teachersshallbeabletomoderateorremove comments in their class.


**3.5.1 System Actors**

## 3.5 Use Case Modeling

igure 3.5 maps the functional interactions between actors (Student, Teacher) and system modules. It employs a
hierarchical structure where both roles inherit shared account capabilities from a base 'User' actor

**Figure 3.5:** Detailed Use Case Diagram highlighting the separation between Student Learning, Teacher
Management, and Automated AI Functions.


**3.5.2 Functional Modules Breakdown**
As illustrated in Figure 3.5, the system’s functionality is organized into five logical packages, ensuring a clean
separation of concerns:

background:

environment:

```
Automatically invoked via <<include>> when a student takes a class exam to ensure
```
```
Continuously updates review intervals based on student answers to optimize retention.
```
**1. Account Management** This module handles the foundational security layer. Since both Student and Teacher
actors inherit from the abstract "User" actor, they share these core capabilities:

```
Register/Log In: Secure authentication for accessing the platform.
Manage Profile: Updating personal details and settings.
```
**2. Student Learning Journey (Self-Study)** This package represents the core loop of the application. It
highlights the adaptive nature of the system:

```
Study & Solve: Students engage with lessons (Text/Video) and solve interactive questions.
AI Extensions: The standard learning flow is enhanced by "Chat with AI Tutor" (providing instant help)
and "Take Placement Quiz" (allowing students to skip basics).
Feedback Loop: The action of solving questions directly triggers the "Update Spaced Repetition
Algorithm" in the background.
```
**3. Shared Class Interaction** This module acts as the bridge between students and teachers, facilitating
community learning:

```
Collaboration: Students can "Join Class" , access shared materials, and communicate via "Direct
Student-Teacher Chat".
```
```
4.Classroom Management (Teacher) A dedicated workspace for educators to manage the learning
```
```
Content Creation: Teachers can "Create Interactive Materials" (Lessons/Exams), with the ability to
"Preview" them before publishing. Decision Support: The "Track Class Performance" use case is
extended by "View AI DSS Insights" , giving teachers data-driven recommendations on student
performance.
```
```
This package contains the "Invisible Actors" (AI Agents) that run in the
```
```
AI Proctoring:
security. SRS
Algorithm:
```
**5. System Automated Functions**


## 3.6 Process Modeling

While the Use Case diagram defines the functional scope, Activity Diagrams illustrate the dynamic workflow
and logic control within the system. The following diagrams detail the sequential steps for the primary learning
and teaching scenarios.

Exams.

```
: Student workflow showing the three primary access points: SRS Review, Lesson Study, and Class
```
Figure 3.6.1 illustrates the high-level operational flow for the Student actor. Upon signing in and landing on the
dashboard, the system logic bifurcates into three distinct learning paths:

1. **Review Queue (Blue Path):** A direct entry point for Spaced Repetition reviews, prioritizing retention
tasks.
2. **Lesson Study (Green Path):** The self-paced learning flow where students browse subjects and select
lessons. This path highlights the integration of the **"AI Tutor"** , allowing students to ask context-aware
questions while viewing content (Video/Text) before proceeding to exercises.
3. **Classroom Activities (Orange Path):** The institutional flow where students access teacher-assigned
content. This path features a specialized **"Exam Mode"** block, which enforces security protocols (Full
Screen, Security Check) before allowing the student to attempt a test.

```
All paths ultimately converge at the "Start Exercises" or "Submit" node, leading to the detailed solving phase.
```
```
Figure 3.6.1
```
```
3.6.1 Student Navigation & Learning Flow
```

**3.6.2 Interactive Solving & Feedback Loop**
Following the selection of a learning activity, Figure 3.6.2 details the execution phase of the session. This
diagram illustrates the "Active Recall" loop, which is central to the platform's pedagogical approach.

The process begins with **"Initialize Question Queue"** , where the system retrieves the specific set of problems
based on the user's entry point (Review or Lesson). The workflow is characterized by two key subsystems:

1. **Feedback & Learning Module:** Upon submitting an answer, the student receives immediate validation. If
the standard explanation is insufficient, the diagram shows an optional branch where the user can **"Click
'Ask AI Tutor'"**. In this flow, the AI analyzes the specific question context and the user's doubt to provide
a tailored explanation, resolving misconceptions on the spot.
2. **SRS Integration:** Crucially, before moving to the next question, the system performs the **"Update Spaced
Repetition Interval"** step. This ensures that the student's performance (Success/Failure) is instantly
recorded to calculate the optimal date for the next review.

The loop continues until the queue is exhausted, ending with a **"Session Summary"** that displays achievements
and progress.The workflow is visualized in **Figure 3.6.2** (see next page)


**Figure 3.6.2** : The core learning loop showing interactive solving, AI-assisted remediation, and real-time SRS
updates. lookup to the seconed page.


**3.6.3 Teacher Classroom Management Workflow**
Figure 3.6.3 delineates the administrative and analytical capabilities available to the Teacher actor. Upon entering
a specific class, the "Classroom Dashboard" acts as the central hub for four primary operational streams:

1. **Member Management & DSS:** This path allows teachers to manage the roster (Invite/Remove).
Crucially, it integrates a **Decision Support System (DSS)**. When a teacher selects a specific student, the
system loads an "Individual DSS" to highlight weak areas, enabling data-driven interventions via **Direct
Messages**.
2. **Content Creation:** A direct link to the content authoring tools (detailed in the next diagram) for creating
    lessons and exams.
3. **Communication Hub:** Facilitates class-wide interaction through public discussions and announcements
    ("Class Chat").
4. **Analytics Module:** Allows the teacher to view global performance metrics, specifically enabling the
analysis of **"Failure Rates"** to identify difficult topics across the entire cohort.The workflow is visualized
in **Figure 3.6.3** (see next page)


**Figure 3.6.3** : Teacher dashboard workflow highlighting roster management, AI-driven student insights (DSS),
and class analytics.


**3.6.4 Content Authoring & Assessment Creation**
Figure 3.6.4 details the complex workflow for generating educational material. The process begins with
selecting the material type, branching into two specialized editors:

1. **Lesson Editor (Left Branch):** This path focuses on constructing the learning experience. It features a loop
for adding **"Text/Media Content"** and, crucially, allows the insertion of **"Interactive Nodes"** —the
platform's signature feature for active learning. It also supports embedding exercises directly within the
lesson flow.
2. **Assessment Configuration (Right Branch):** This path handles the logistical setup of evaluations. It
    distinguishes between:
       **Exams:** Which require strict settings like **"Enable AI Proctoring"** , duration limits, and specific
       start/end windows.
       **Exercises:** Which are more flexible and governed by due dates.
3. **Question Builder Loop:** Regardless of the type, the teacher enters an iterative loop to **"Select Question
Type," "Fill Data,"** and **"Preview"** each item. This ensures quality control (Validation) before the content
is saved.

The process converges at the **"Review Final Content"** stage, followed by publishing to the class roster and
triggering automatic student notifications.The workflow is visualized in **Figure 3.6.4** (see next page)


**Figure 3.6.4:** The content creation lifecycle, detailing the configuration of interactive lessons and secure,
proctored exams.


## Chapter 4: System Design

## 4.1 System Architecture

The Eureka platform utilizes a **Modular Client-Server Architecture** to ensure scalability and

security. As illustrated in **Figure 4.1** , the system is organized into three primary tiers:

```
Presentation Layer: Browser-based interfaces split into a Student Portal (featuring a
local Exercise Engine for low-latency validation) and a Teacher Dashboard ,
communicating with the backend via secure APIs.
Logic Layer (Cloud Backend): The system's core comprising an API Gateway for
routing, an SRS Module for repetition algorithms, an AI Controller acting as middleware
for external LLMs, and Core Services for user management.
Data & Integration: Consists of a centralized Database for content/logs and External
Services utilizing Google for Authentication and third-party APIs for AI capabilities.
```
Figure 4.1: High-level System Architecture showing the data flow between Client Frontends,
Backend, and External AI Services.

```
the Cloud
```

## 4.2 Database Design (ERD)

The database schema is designed to ensure data integrity while maintaining the flexibility required for complex
interactive questions. As shown in **Figure 4.2** , the system utilizes a normalized relational structure enhanced with
JSON fields for dynamic content storage.

```
The design implements a "Table-per-Type" pattern. The base
entity stores authentication credentials (user_id as UUID, password_hash). It branches into two
specialized 1:1 profiles:
Stores gamification metrics (xp_points, badges).
Links to the created content and department info.
```
```
Classes are created by teachers and linked to students via a many-to-many
junction table.
Lessons serve as containers for content. The Question entity is designed for high^
flexibility; it uses a JSON column (question_body) to store diverse structures (e.g., bar charts,
geometry graphs) without altering the schema.
Answer_Key: A dedicated 1:1 entity that separates the problem statement from the solution, securing
the validation logic (expected_body).
Learning & SRS Logic:
User_Submission: A historical log of every attempt, storing the student's raw input (submitted_value)
for analytics.
SRS_Queue: The core algorithmic table. It maps a specific student to a specific question, tracking
metadata like ease_factor, interval_days, and repetition_count to schedule the next_review_date.
```
**Figure 4.2** next page illustrates the complete Entity Relationship Diagram.

**4.2.1 Key Entities & Relationships**

```
User Management(InheritanceStrategy):
User
```
```
Student_Profile:
Teacher_Profile:
Content Hierarchy:
Class & Enrollment:
Class_Enrollment
Lesson & Question:
```

**Figure 4.2:** Entity Relationship Diagram highlighting the usage of UUIDs for scalability and

JSON fields for polymorphic question types.


## 4.3 Structural Design (Class Diagram)

Figure 4.3 illustrates the static structure of the system using Object-Oriented principles. The design is
modularized into four primary packages, utilizing standard **Design Patterns** to ensure extensibility, particularly
for the interactive question engine.

```
The system applies the Inheritance principle where both Student and
Teacher classes extend the abstract User class. This centralizes authentication logic (login()) and shared
attributes (userId, email) while allowing distinct behaviors (e.g., createClass for Teachers vs.
solveQuestion for Students).
Exercise Engine (Strategy Pattern): To handle the complexity of diverse interactive nodes, the design
implements the Strategy Pattern :
Rendering Strategy: The Question class relies on the QuestionRenderer interface. This allows the
system to dynamically switch between implementations (e.g., BarChartRenderer) at runtime without
modifying the core class.
Validation Strategy: Similarly, the Answer class delegates grading to the Validator interface (e.g.,
ExactMatchValidator), making it easy to add complex validation logic (like AI-based text matching) in
the future.
Learning Logic (Separation of Concerns): The SRSAlgorithm is isolated in its own utility class. It
processes performance data from Student and updates the ProgressLog, ensuring that the mathematical
logic of Spaced Repetition is decoupled from the user interface.
```
**Figure 4.3 Next page** details the class hierarchy and relationships.

**4.3.1 Key Design Patterns & Modules**

```
User Management(Inheritance):
```

## Figure 4.3 Class Diagram



