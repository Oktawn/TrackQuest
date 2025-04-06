
type RequestCreateType = {
  topic: string;
  message: string;
}

type RequestUpdateType = {
  id: number;
}

type RequestCancelType = RequestUpdateType & {
  reason_cancelled: string;
}
type RequestCompleteType = RequestUpdateType & {
  text_answer?: string;
}

type RequestFilterType = {
  dateFrom: string;
  dateTo?: string;
}

export {
  RequestCreateType,
  RequestUpdateType,
  RequestCancelType,
  RequestCompleteType,
  RequestFilterType
}