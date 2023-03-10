import React from "react";
import Moment from "react-moment";
import styled from "styled-components";

import { ReactComponent as NairaIcon } from "../assets/icons/naira-icon.svg";
import { formatNumber } from "../helpers/formatNumbers";

import inImg from "./../assets/img/in.png";
import outImg from "./../assets/img/out.png";
import NoData from "./bits/NoData";

type PlanTransactionTableProps = {
  savingHistory: any;
  planType: string;
};

const PlanTransactionTable = (props: PlanTransactionTableProps) => {
  const { savingHistory, planType } = props;

  return (
    <Wrapper className="col-12">
      <div className="trans-table">
        {savingHistory.length > 0 ? (
          <table className="table align-middle">
            <thead className="header">
              <tr>
                <th></th>
                {/* <th style={{ width: "10%" }}></th> */}
                <th>Description</th>
                <th style={{ minWidth: "100px" }}>Date</th>
                <th>Plan Type</th>
                <th className="text-center status">
                  <div className="gd">Status</div>
                </th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {savingHistory.map((saving: any, index: number) => {
                const isCardVer: boolean =
                  saving.reference.split("-")[0] === "CV";
                // const isWalletTrans: boolean = item.reference.split("-")[0] === "WT";
                // const isWithdrawal: boolean = item.reference.split("-")[0] === "ptba";
                return (
                  <tr key={index}>
                    <td>
                      {/* <td style={{ width: "10%" }}> */}
                      <div className="icon align-middle">
                        {saving.type === "debit" ? (
                          <img src={outImg} alt="outgoing" />
                        ) : (
                          <img src={inImg} alt="incoming" />
                        )}
                      </div>
                    </td>
                    <td>
                      {isCardVer
                        ? "Card Verification"
                        : `${saving.description}`}
                    </td>
                    <td>
                      <Moment format="MMM DD, YYYY">{saving.created_at}</Moment>
                    </td>
                    <td>{isCardVer ? "Card Verification" : planType}</td>
                    <td className="text-center status">
                      <div
                        className={`${
                          saving.status === "success" ? "good" : "bad"
                        }`}
                      >
                        {saving.status === "success" ? "Success" : "Failed"}
                      </div>
                    </td>
                    <td>
                      <div className="amt">
                        {/* {saving.amount && `??? ${formatNumber(parseFloat(saving.amount))}`} */}
                        <NairaIcon
                          style={{
                            width: "13px",
                            height: "14px",
                            marginInlineEnd: "0.25rem",
                          }}
                        />
                        {formatNumber(parseFloat(saving.amount))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="mt-4 pt-4">
            <NoData
              text="You have not yet performed a transaction. You can perform one by topping up or withdrawing from your plan"
              //   link="/user/savings"
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .trans-table {
    // font-size: 16px;
    padding: 0 !important;
    table {
    },
      th {
        padding: 0.5rem;
      }
      td {
        color: #33277b;
        padding: 0.5rem;
      }
    }
    .header{
      color: #47486B99;
    }
    .status {
      width: 20%;
    }
    .bad {
      color: #ea0505b2;
      background: rgba(234, 5, 5, 0.15);
      border-radius: 5px;
      padding: 0.5rem;
    }
    .good {
      color: #059157;
      background: rgba(207, 232, 222, 0.2);
      border-radius: 5px;
      padding: 0.5rem;
    }
    .amt {
      display: flex;
      flex-direction row;
      align-items: center;
    }

    @media screen and (min-width: 500px) {
      .gd {
        margin: 0rem 2rem 0rem 0rem;
        padding: 0px;
      }
      .good,
      .bad,
      .processing {
        margin-right: 2rem;
      }
    }

    @media screen and (max-width: 500px) {
      .trans-table {
        overflow-x: auto;
        margin-top: 0 !important;
        padding-top: 0 !important;
        table {
          min-width: 550px;
        },
          th,
          td {
            padding: 0.28rem;
            img {
              height: 25px;
              width: 25px;
            }
          }
        }
      }
    }

  }
`;

export default PlanTransactionTable;
