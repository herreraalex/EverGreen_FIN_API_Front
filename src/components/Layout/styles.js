import styled from "styled-components";

import { v } from "../../styles/variables";

export const SLayout = styled.div`
    display: flex;
`;

export const SMain = styled.main`
    padding: calc(${v.smSpacing} * 2);
    margin-left: 30px;

    h1 {
        font-size: 14px;
    }
`;
