import { Between } from "typeorm";
import { RequestStatusEnum } from "../commons/enums";
import { RequestCancelType, RequestCompleteType, RequestCreateType, RequestFilterType } from "../commons/types";
import { dataSource } from "../data-source";
import { RequestEntity } from "../entities/Request.entity";
import moment from "moment";


var requestsRepo = dataSource.getRepository(RequestEntity);

export class RequestService {
  async createRequest(data: RequestCreateType) {
    if (!data.topic || !data.message) {
      throw new Error("Topic and message are required");
    }
    try {
      const request = requestsRepo.create(data);
      await requestsRepo.save(request);
    } catch (error) {
      throw new Error(`Failed to create request: ${error.message}`);
    }
  }
  async startRequest(id: number) {
    try {
      const request = await requestsRepo.findOneBy({ id: id });
      request.status = RequestStatusEnum.IN_PROGRESS;
      await requestsRepo.save(request);
      return request;
    } catch (error) {
      throw new Error(`Failed to start request: ${error.message}`);
    }
  }
  async completeRequest(data: RequestCompleteType) {
    var { id, text_answer } = data;
    if (!text_answer) {
      throw new Error("text_answer are required");
    }
    try {
      const request = await requestsRepo.findOneBy({ id: id });
      request.status = RequestStatusEnum.COMPLETED;
      request.text_answer = text_answer;
      await requestsRepo.save(request);
      return request;
    } catch (error) {
      throw new Error(`Failed to complete request: ${error.message}`);
    }
  }
  async cancelRequest(data: RequestCancelType) {
    var { id, reason_cancelled } = data;
    if (!reason_cancelled) {
      throw new Error("reason_cancelled are required");
    }
    try {
      const request = await requestsRepo.findOneBy({ id: id });
      request.status = RequestStatusEnum.CANCELLED;
      request.reason_cancelled = reason_cancelled;
      await requestsRepo.save(request);
      return request;
    } catch (error) {
      throw new Error(`Failed to cancel request: ${error.message}`);
    }
  }
  async cancelAllWorks() {
    try {
      const requests = await requestsRepo.findBy({ status: RequestStatusEnum.IN_PROGRESS });
      for (const request of requests) {
        request.status = RequestStatusEnum.CANCELLED;
        await requestsRepo.save(request);
      }
      return requests;
    } catch (error) {
      throw new Error(`Failed to cancel all works: ${error.message}`);
    }
  }
  async getWithFilters(dateFrom: string, dateTo?: string) {
    try {
      const dateFromParsed = moment(dateFrom, "DD.MM.YYYY").startOf("day");
      const dateToParsed = dateTo ? moment(dateTo, "DD.MM.YYYY") : moment(dateFromParsed).endOf("day");
      if (!dateFromParsed || !dateToParsed) {
        throw new Error("Invalid date format");
      }
      const requests = await requestsRepo.find({
        where: {
          created_at: Between(
            dateFromParsed,
            dateToParsed
          ),
        }, order: {
          id: "ASC"
        }
      });
      return requests;
    } catch (error) {
      throw new Error(`Failed to get requests with filters: ${error.message}`);
    }
  }

}