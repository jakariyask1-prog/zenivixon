import { GoogleGenerativeAI } from "@google/generative-ai";
import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const qdrantUrl = process.env.QDRANT_URL || "http://localhost:6333";
const qdrantApiKey = process.env.QDRANT_API_KEY || "";

const client = new QdrantClient({
  url: qdrantUrl,
  apiKey: qdrantApiKey,
});

const COLLECTION_NAME = "zenivixon_knowledge_base";

const documents = [
  {
    id: 1,
    category: "FAQ",
    title: "What services does Zenivixon offer?",
    content: "Zenivixon engineers purpose-built autonomous AI agents, AI workflows & business automation pipelines, custom software & modern web development (Next.js/React), and AI system integration (Vector RAG). We transform manual operations into intelligent automated workflows.",
  },
  {
    id: 2,
    category: "FAQ",
    title: "Do you work with our existing software and databases?",
    content: "Yes, you do not need to discard existing software infrastructure. We embed custom AI models, semantic search, vector pipelines, and intelligent capabilities directly into your current web apps, legacy databases, ERPs, and enterprise platforms via secure API adapters.",
  },
  {
    id: 3,
    category: "FAQ",
    title: "How long does a typical project take?",
    content: "Depending on the scope, a typical MVP or integration project takes 4 to 8 weeks. Comprehensive custom software builds or enterprise-wide AI automation pipelines may take 12 to 16 weeks, delivered in strategic milestones.",
  },
  {
    id: 4,
    category: "FAQ",
    title: "What is your support and maintenance structure?",
    content: "We provide full production deployment and ongoing maintenance. We implement observability dashboards to track throughput and error rates, monitor AI execution health, and provide retainer-based SLAs for mission-critical deployments.",
  },
  {
    id: 5,
    category: "Pricing Policy",
    title: "Zenivixon Pricing Policy",
    content: "Zenivixon operates on a clear, transparent milestone-based pricing model. We eliminate hidden fees. For custom software and AI automation, projects are divided into distinct milestones (e.g., architecture, frontend, backend, AI integration), each with clear deliverables. Retainer options are available for ongoing AI agent support, RAG system maintenance, and dedicated cloud hosting.",
  },
  {
    id: 6,
    category: "Documentation",
    title: "Service: AI Agents & 24/7 Customer Support",
    content: "We engineer autonomous AI agents and customer support copilots that interact with internal software and resolve customer inquiries in real time. Features include 24/7 Multi-Channel Customer Support, Internal Knowledge Discovery for distributed teams, and Autonomous Inbound Triage for enterprise sales inquiries.",
  },
  {
    id: 7,
    category: "Documentation",
    title: "Service: AI Workflow & Business Automation",
    content: "We transform manual bottlenecks into intelligent pipelines. Our automation orchestration handles unstructured inputs (emails, scans, PDFs) and converts them into validated data. Use cases include Accounts Payable & Invoice Auditing, E-commerce Inventory Synchronization, and Compliance Contract Ingestion.",
  },
  {
    id: 8,
    category: "Documentation",
    title: "Service: Custom Software & Modern Web Development",
    content: "We design high-speed Next.js/React web platforms, custom SaaS applications, and AI-native software. Our architecture uses fast frontend components (React/Next.js), high-throughput backend APIs (FastAPI/Node.js), and integrated AI copilots for enhanced software utility.",
  },
  {
    id: 9,
    category: "Documentation",
    title: "Service: AI System Integration & Vector RAG",
    content: "We build Vector RAG (Retrieval-Augmented Generation) systems that transform proprietary company data into searchable semantic knowledge bases. This allows natural language querying of legacy databases and enterprise semantic search portals without disrupting existing workflows.",
  },
];

async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

async function main() {
  console.log("Connecting to Qdrant at", qdrantUrl);
  
  // Check if collection exists
  const collections = await client.getCollections();
  const exists = collections.collections.some(c => c.name === COLLECTION_NAME);
  
  if (!exists) {
    console.log(`Creating collection '${COLLECTION_NAME}'...`);
    // Gemini text-embedding-004 returns 768 dimensions
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 768,
        distance: "Cosine",
      },
    });
  } else {
    console.log(`Collection '${COLLECTION_NAME}' already exists. Skipping creation.`);
  }

  console.log("Generating embeddings and uploading documents...");
  
  const points = [];
  
  for (const doc of documents) {
    const textToEmbed = `${doc.title}\n${doc.content}`;
    console.log(`Embedding: ${doc.title}`);
    const vector = await generateEmbedding(textToEmbed);
    
    points.push({
      id: doc.id,
      vector: vector,
      payload: {
        category: doc.category,
        title: doc.title,
        content: doc.content,
      },
    });
    
    // Add delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log("Inserting into Qdrant...");
  await client.upsert(COLLECTION_NAME, {
    wait: true,
    points: points,
  });
  
  console.log("Successfully ingested data into Qdrant!");
}

main().catch(console.error);
