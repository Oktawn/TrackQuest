import { Router } from "express";
import { RequestService } from "./requests.service";
import { RequestCancelType, RequestCompleteType, RequestCreateType } from "../commons/types";

var requestRouter = Router();
var requestService = new RequestService();

requestRouter.post("/create", async (req, res) => {
  try {
    const data: RequestCreateType = {
      ...req.body
    }
    await requestService.createRequest(data);
    res.status(201).json({ message: "Request created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
  .patch("/start", async (req, res) => {
    try {
      const id = Number(req.query.id);
      await requestService.startRequest(id);
      res.status(200).json({ message: "Request started successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .patch("/complete", async (req, res) => {
    try {
      const id = Number(req.query.id);
      const data: RequestCompleteType = {
        ...req.body,
        id: id
      };
      await requestService.completeRequest(data);
      res.status(200).json({ message: "Request completed successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .patch("/close", async (req, res) => {
    try {
      const id = Number(req.query.id);
      const data: RequestCancelType = {
        ...req.body,
        id: id
      };
      await requestService.cancelRequest(data);
      res.status(200).json({ message: "Request closed successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  )
  .patch("/cancelAllWorks", async (req, res) => {
    try {
      await requestService.cancelAllWorks();
      res.status(200).json({ message: "All requests closed successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  )
  .get("/getWithFilters", async (req, res) => {
    var { dateFrom, dateTo } = req.query;
    try {
      const data = await requestService.getWithFilters(dateFrom.toString(), dateTo?.toString())
      res.status(200).json({ requests: data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  );

export { requestRouter };