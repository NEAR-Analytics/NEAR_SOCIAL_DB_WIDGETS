const Heading = styled.p`
  margin: 0;
  font-size: 1em;
  color:#0f1d40;
  line-height:2.1rem;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;

const ImageUploadCard = styled.div`
    display:flex;
    cursor:pointer;
    flex-flow: column nowrap;
    align-items: center;
    justify-content:center;
    width:100%;
    height:100%;
    max-width:350px;
    max-height:350px;
    border: 4px dashed rgba(0,0,0,.1);
    border-radius: 1rem;
    margin:30px auto;
    padding:1.5rem;
    text-align: center;
    background:#fff;
    transition: all .2s;

    &:hover {
        max-width:400px;
        max-height:400px;
        transform:scale(1.01);
        transition: all .2s;
    }

`;

const NFTCard = styled.div`
    display:flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content:center;
    width:100%;
    max-width:350px;
    min-height:350px;
    border: 4px solid rgba(0,0,0,.05);
    border-radius: 1rem;
    margin:30px auto;
    padding:1rem;
    text-align: center;
    background:#fff;
    transition: all .2s;

    .body {
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        flex-grow:1;
        padding: 1rem;
        box-sizing:border-box;

        p {
            margin:0;
            padding:0;
        }

        input {
            font-weight:bold;
            font-size:1.5rem;
        }

        input, textarea {
            position:relative;
            text-align:center;
            text-overflow:ellipsis;
            max-width:300px;
            background-color:transparent;
            border:0;
            color:#000;
        }
    }

    & > div {
        position:relative;
        width:100%;

        img {
            width:100%;
            border-radius:.8rem;
        }
        .replace-btn {
            position:absolute;
            bottom:0;
            right:0;

            img {
                display:none!important;
            }

        }
    }

    .mint-btn {
        width:100%;
        height:60px;
        cursor:pointer;
        border:0;
        border-radius:10px;
        background-color:#0fbf41;
        font-weight:bold;
        color:rgba(0,0,0,.7);

        &:disabled {
            background-color:#66c480;
            color:rgba(0,0,0,.3);
            cursor:not-allowed;
        }
    }

`;

const Editable = styled.div`
    position:relative;
    width:100%;

    &.editable {

        &:hover {
            &::after {
                opacity:.6;
            }
        }

        &::after {
            opacity:0;
            position:absolute;
            content: '✏️';
            width:20px;
            height:20px;
            top:0;
            bottom:0;
            right:0;
            margin:auto;
            transform:rotate(90deg);
        }
    }
`;

const SendToInput = styled.div`
    position:relative;
    border:1px solid rgba(0,0,0,.2);
    border-radius:10px;
    margin-top:2rem;
    width:110%;

    input {
        width:100%;
        color:#000;
        &:placeholder {
          color:#000;
        }
    }

    label {
        position:absolute;
        top:-10px;
        left:-10px;
        background-color:#fff;
        padding: 5px;
        border-radius:10px;
        font-size:.8em;
    }

`;

const Main = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  margin-top: 5px;
  width:100%;
  min-height:100vh;
  padding: 1rem 1rem 0;
  box-sizing:border-box;
  .button{
    padding: .75em 2em;
    border-radius: .7em;
    border: 1px solid #0d99ff;
    transition: all .3s;
    cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover{
        color: #0d99ff;
        background:#fff;
    }
  @media screen and (max-width: 540px){
      padding: .5em 2em;    
      }
  }
`;

const Text = styled.p`
font-size: .9rem;
color: #525c76;
line-height:1.rem;
margin: 3px;
`;

const Elipse = styled.div`
display:flex;
align-items:center;
justify-content:center;
border: 4px solid rgba(0,0,0,.1);
background:#fff;
height: 100px;
width: 100px;
border-radius: 20px;
`;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
& input{
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
  box-shadow:none;
    border:1px solid #0d99ff;
  }
  &::placeholder {
    color: palevioletred;
  }
  }
  .soulbound{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height:100%;
  max-height:100%;
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  &>img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  }
`;

const Input = styled.input`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const TextArea = styled.textarea`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
`;

const SelectTag = styled.select`
  height: fit-content;
  width: 300px;
`;

const ChainIcon = styled.option`
  display: flex;
  height: 130px;
  padding: 1rem auto;
  &>img{
    height:100px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectReplicaContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1;
  user-select:none;

  & .select-replica__select {
    position: relative;
  }

  & .select-replica__selected {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 4px solid rgba(0,0,0,.05);
    gap: 10px;
    border-radius: 10px;
    background-color: #fff;
    width: 350px;
    padding:0 15px 0 10px;
    min-height:70px;


    & > img {
      height: 100%;
      width: 80px;
      object-fit: contain;
    }

    & > span {
        opacity:.6;
    }

  }

  & .select-replica__options {
    position: absolute;
    opacity:0;
    top: 110%;
    left: 0;
    width: 100%;
    left:0;
    right:0;
    margin:auto;
    overflow-y: auto;
    border-radius: 10px;
    background-color: #fff;
    max-height: 300px;
    box-shadow: 0 10px 20px 10px rgba(0,0,0,.05);
    pointer-events:none;
    transform:translateY(100px);
    transition: all .2s;
  }

  & .select-replica__options.open {
    transition: all .2s;
    transform:translateY(0);
    opacity:1;
    pointer-events:all;
  }

  & .select-replica__option {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    padding: 0;
    border-bottom: 1px solid rgba(0,0,0,.05);
  }

  & .select-replica__option.selected {
    background-color: #f0f0f0;
  }

  & .select-replica__option img {
    height: 80px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  align-items:center;
`;

const ToggleButton = styled.div`
   /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} 
`;

const HeaderBox = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    .connect-wallet {
        background:rgba(0,0,0,1);
        border-radius:10px;
        font-weight:bold;
        color:#fff;
        box-shadow: 0 0 0 4px rgba(0,0,0,.1);
        height:60px;
    }
`;

const HistoryBox = styled.div`
  display:flex;
  flex-direction:column;
  max-width:750px;
  margin:0 auto;
`;

const HistoryNFTBox = styled.div`
  display:flex;
  width:100%;
  max-width:800px;
  background-color:#fff;
  border-radius:10px;
  margin-top:20px;
  box-shadow: 0 0 0 4px rgba(0,0,0,.02);
  box-sizing:border-box;
  padding:.7rem;

  img {
    background-color:rgba(0,0,0,.05);
    height:100px;
    border-radius:.5rem;
  }

  .details {
    padding:0 1rem;
    box-sizing:border-box;
    border-right:1px solid rgba(0,0,0,.05);

    h1 {
      font-size:1.3rem;
    }

    .description {
      font-size:.8rem;
      margin-bottom:0;
      padding:0;
      opacity:.8;
    }

    .author {
      margin:0;
      padding:0;
      font-weight:bold;
      font-size:.8rem;
    }

  }

  .tx-details {
    padding:0 1rem;
    box-sizing:border-box;

    p {
      margin:0;
      padding:0;
    }

    .title {
      font-weight:bold;
      font-size:.8rem;
    }

    .info {
      font-size:.7rem;
    }

  }

`;

return {
  Heading,
  ImageUploadCard,
  NFTCard,
  Editable,
  SendToInput,
  Main,
  Text,
  Elipse,
  Card,
  ImageCard,
  Input,
  TextArea,
  SelectTag,
  ChainIcon,
  SelectReplicaContainer,
  SelectGroup,
  ToggleButton,
  HeaderBox,
  HistoryBox,
  HistoryNFTBox,
};
