import React from "react";
import {
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useWebsocket } from "../../../utils/use-websocket";
import { WSEventType } from "../../../api/models/Event";
import { formatCtime } from "../../../utils/ctime";
export const EventsList = () => {
  const { messages } = useWebsocket<WSEventType>({
    url: "wss://test.relabs.ru/event",
  });
  return (
    <CContainer className={"main__row-inner"}>
      <CTable>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
          </CTableRow>
          {messages.map((it) => (
            <CTableRow key={it.event}>
              <CTableDataCell>{it.event}</CTableDataCell>
              <CTableDataCell>{formatCtime(it.ctime)}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};
