import { useState } from 'react';
import { AddressWrap, AppWrap, GetButton, Header, InputWrap, SendButton, SendWrap } from './app-wrap';
import { keplr } from './keplr-util';

function App() {
  const [address, setAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const getMyAccount = async () => {
    const account = await keplr.getAccount();
    setAddress(account);
  };

  const sendToken = async () => {
    if (!recipient || !amount) {
      alert('타겟주소와 수량을 입력해주세요')
      return;
    }
    return keplr.sendToken(recipient, amount)
  }

  return (
    <AppWrap>
      <AddressWrap>
        <GetButton onClick={getMyAccount}>내 주소 가져오기</GetButton>
        <div>{address || '선택된 주소가 없습니다.'}</div>
      </AddressWrap>
      <Header>토큰 전송</Header>
      <SendWrap>
        <InputWrap>
          <div>타겟 주소</div>
          <input value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{ width: '300px' }} />
        </InputWrap>
        <InputWrap>
          <div>수량</div>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '300px' }} />
        </InputWrap>
        <SendButton onClick={sendToken}>전송!</SendButton>
      </SendWrap>
    </AppWrap>
  );
}

export default App;
