
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyD4PDKgkfpXPKWM-WEAUNOSP2X75Tk5LQE";
  
  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.1,
      topK: 1,
      topP: 1,
      maxOutputTokens: 512,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const parts = [
      {text: "input: You are web engineer"},
      {text: "input 2: you are web application engineer."},
      {text: "output: **Skills:**\n\n* **Front-end Development:**\n    * HTML, CSS, JavaScript, jQuery, Bootstrap, Materialize\n    * Responsive design and cross-browser compatibility\n* **Back-end Development:**\n    * Node.js, Express, Django, Flask, Rails\n    * SQL and NoSQL databases (MySQL, MongoDB, PostgreSQL)\n    * RESTful APIs\n* **DevOps:**\n    * Git, GitHub, CI/CD\n    * Docker, Kubernetes, AWS, Azure\n* **Data Analysis and Visualization:**\n    * Python, Pandas, Matplotlib, Seaborn\n* **Project Management:**\n    * Agile methodologies (Scrum, Kanban)\n    * Requirements gathering, planning, and execution\n* **Collaboration and Communication:**\n    * Team collaboration tools (Slack, Microsoft Teams)\n    * Excellent written and verbal communication skills\n\n**Experience:**\n\n* **Web Engineer, XYZ Company** (2021-Present)\n    * Designed and developed responsive web applications\n    * Implemented RESTful APIs and integrated them with front-end applications\n    * Implemented CI/CD pipelines for automated testing and deployment\n* **Junior Web Developer, ABC Company** (2019-2021)\n    * Assisted with front-end development and back-end integrations\n    * Gained hands-on experience with various web technologies\n    * Contributed to team projects and received positive feedback\n\n**Education:**\n\n* **Bachelor of Science in Computer Science**, University of California, Berkeley (2019)\n\n**Certifications:**\n\n* AWS Certified Solutions Architect - Associate\n* Microsoft Certified Azure Fundamentals\n* Scrum Master Certification"},
      {text: "input: you are software engineer"},
      {text: "input 2: You are Software Architecture"},
      {text: "output: **Skills:**\n\n* **Software Architecture:**\n    * Design and implementation of complex software systems\n    * Cloud computing architectures (AWS, Azure, GCP)\n    * Microservices and distributed systems\n    * Security and scalability considerations\n* **Programming Languages:**\n    * Java, Python, C#, JavaScript, Go\n* **Databases:**\n    * SQL and NoSQL databases (MySQL, MongoDB, PostgreSQL, Cassandra)\n    * Data modeling and optimization\n* **DevOps:**\n    * Continuous integration and delivery (CI/CD)\n    * Cloud deployment and management (AWS, Azure, GCP)\n* **Project Management:**\n    * Agile methodologies (Scrum, Kanban)\n    * Requirements gathering, planning, and execution\n    * Risk management and stakeholder communication\n\n**Experience:**\n\n* **Software Architect, XYZ Company** (2021-Present)\n    * Designed and implemented a cloud-based software platform\n    * Led a team of engineers to develop microservices and distributed applications\n    * Contributed to industry-leading publications on software architecture\n* **Senior Software Engineer, ABC Company** (2019-2021)\n    * Designed and developed complex software solutions\n    * Implemented scalable and secure systems\n    * Mentored and guided junior engineers\n\n**Education:**\n\n* **Master of Science in Computer Science**, University of California, Berkeley (2019)\n\n**Certifications:**\n\n* AWS Certified Solutions Architect - Professional\n* Microsoft Certified Azure Architect\n* Scrum Master Certification"}
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    console.log(response.text());
  }
  
  run();

  