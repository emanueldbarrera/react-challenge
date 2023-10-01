import { css } from "styled-components";

export const skeletonAnimation = css`
  @keyframes skeleton-loading {
    to {
      background-position: left;
    }
  }
`;

export const skeletonElement = css`
  background: linear-gradient(90deg, #ddda 40%, #efefefaa, #ddda 60%) right /
    300% 100%;
  animation: skeleton-loading 1.5s linear infinite;
`;
