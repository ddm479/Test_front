import React from "react";
import styled from "styled-components";

// em은 해당 단위가 사용되고 있는 요소의 font-size 속성 값이 기준으로 비례함
// rem은 최상위 요소(root)를 기준, HTML에서는 <html>요소의 font-size 속성 값이 기준으로 비례 
const Wrapper = styled.div`
    paddign: 1em;
    background: grey;
    margin: 2vh 25vw;  
    text-align: center;
    border: 0.2rem solid black;

    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
`;
/*
    const Wrapper = styled.div`
    paddign: 1em;
    background: grey; 
    margin: 2vh 25vw;  // vw, vh는 뷰포트의 너비값과 높이값이고, 위아래 왼쪽 오른쪽으로 margin을 주기 때문에 각각 50을넘으면 Wrapper의 공간이 없어져 내용이 안보임
    border: 1em;

    display: flex;
    flex-direction: column; // 아이템들이 어떤 방향으로 배치될지 결정, main-axis 결정,
    main-axis의 수직 방향인 축을 cross-axis
    align-items: center;   // 컨테이너 내에서 아이템을 어떻게 정렬할지 결정, cross-axis 기준
    justify-content: flex-start; // 컨테이너 내에서 아이템들을 어떻게 나란히 맞출 것이지 결정, main-axis 기준
`;
*/
function PrivacyPolicy(){
    return(
        <Wrapper>
            <p>test</p>
            <p>asdfasdf</p>
            <h1>adfuadhsfluihawrigi</h1>
        </Wrapper>
    )
}

export default PrivacyPolicy;