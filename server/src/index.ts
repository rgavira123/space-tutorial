import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAllArticlesFromDisk, resetContractUsageLevels } from "./utils.js";
import { SpaceClient, connect } from "space-node-client";

const USER_ID = "user-123";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(helmet());
app.use(express.json());
app.use(cors());

// Resolve the frontend content articles directory from the monorepo roo
const articlesDir = path.join(__dirname, "static", "content", "articles");

const spaceClient: SpaceClient = connect({
  url: "http://localhost:5403",
  apiKey: "c52a83122dc0403567dc1d1af2f261da5dce9c49bee7e199b96ce3f4bfc85ac6",
});

spaceClient.on("synchronized", async () => {
  try {
    await spaceClient.contracts.getContract(USER_ID);
    await resetContractUsageLevels(USER_ID, spaceClient);
    console.log("Contract exists, usage levels reset");
  } catch {
    spaceClient.contracts.addContract({
      userContact: {
        userId: USER_ID,
        username: "testUser",
      },
      billingPeriod: {
        autoRenew: true,
        renewalDays: 30,
      },
      contractedServices: {
        news: "1.0",
      },
      subscriptionPlans: {
        news: "BASIC",
      },
      subscriptionAddOns: {},
    });
  }
});

app.get("/api/health", async (_req: Request, res: Response) => {
  res
    .header({
      PricingToken: await spaceClient.features.generateUserPricingToken(
        USER_ID
      ),
    })
    .json({
      ok: true,
      service: "articles-api",
      time: new Date().toISOString(),
    });
});

app.get("/api/articles/:id", async (req: Request, res: Response) => {
  try {
    const evaluationResult = await spaceClient.features.evaluate(
      USER_ID,
      "news-news",
      { "news-maxNews": 1 }
    );

    if (!evaluationResult.eval) {
      return res
        .status(400)
        .header({
          PricingToken: await spaceClient.features.generateUserPricingToken(
            USER_ID
          ),
        })
        .json({
          error:
            "You have reached the limit of news. Come back tomorrow or upgrade your plan for more access!",
        });
    }
    const articles = loadAllArticlesFromDisk(articlesDir);
    const found = articles[Number(req.params.id)];
    if (!found) return res.status(404).json({ error: "Not found" });

    res
      .header({
        PricingToken: await spaceClient.features.generateUserPricingToken(
          USER_ID
        ),
      })
      .json(found);
  } catch (err) {
    res
      .status(500)
      .header({
        PricingToken: await spaceClient.features.generateUserPricingToken(
          USER_ID
        ),
      })
      .json({ error: "Failed to load article" });
  }
});

app.get("/api/subscription", async (req: Request, res: Response) => {
  try {
    const contract = await spaceClient.contracts.getContract(USER_ID);

    res
      .header({
        PricingToken: await spaceClient.features.generateUserPricingToken(
          USER_ID
        ),
      })
      .json({ subscriptionPlan: contract.subscriptionPlans.news });
  } catch (err) {
    res
      .status(500)
      .header({
        PricingToken: await spaceClient.features.generateUserPricingToken(
          USER_ID
        ),
      })
      .json({ error: "Failed to fetch subscription plan" });
  }
});

app.put("/api/subscription", async (req: Request, res: Response) => {
  try {
    const pricingPlans = ["BASIC", "PREMIUM"] as const;

    const currentContract = await spaceClient.contracts.getContract(USER_ID);
    const currentPlan = currentContract.subscriptionPlans.news;

    const currentPlanIdx = pricingPlans.indexOf(currentPlan as any);
    const newPlanIdx =
      currentPlanIdx < pricingPlans.length - 1 ? currentPlanIdx + 1 : 0;
    const newPlan = pricingPlans[newPlanIdx];

    await spaceClient.contracts.updateContractSubscription(USER_ID, {
      contractedServices: {
        news: "1.0",
      },
      subscriptionPlans: {
        news: newPlan,
      },
      subscriptionAddOns: {},
    });

    res
      .header({
        PricingToken: await spaceClient.features.generateUserPricingToken(
          USER_ID
        ),
      })
      .json({ message: `Subscription updated to ${newPlan}` });
  } catch (err) {
    res
      .status(500)
      .header({
        PricingToken: await spaceClient.features.generateUserPricingToken(
          USER_ID
        ),
      })
      .json({ error: "Failed to update subscription" });
  }
});

app.put("/api/pricing", async (req: Request, res: Response) => {
  const contract = await spaceClient.contracts.getContract(USER_ID);

  console.log(req.body);

  await spaceClient.contracts.updateContractSubscription(USER_ID, {
    contractedServices: {
      news: req.body.pricingVersion ?? "1.0",
    },
    subscriptionPlans: {
      news: contract.subscriptionPlans["news"],
    },
    subscriptionAddOns: {},
  });

  return res
    .header({
      PricingToken: await spaceClient.features.generateUserPricingToken(
        USER_ID
      ),
    })
    .json({
      message: `Pricing updated to ${req.body.pricingVersion}`,
    });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
