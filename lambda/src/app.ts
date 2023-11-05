import { getCurrentInvoke } from '@vendia/serverless-express';
import express from 'express'; // ES5形式で記載する
export const app = express();
const port = 3000;

// 簡易的にデータを定義
const members = [
  {
    id: '1',
    name: 'Taro',
    team: 'A',
  },
  {
    id: '2',
    name: 'Jiro',
    team: 'B',
  },
  {
    id: '3',
    name: 'Saburo',
    team: 'A',
  },
];

// パスパラメータを設定しない場合は全メンバーの情報取得 localhost:3000
app.get('/', (req, res) => {
  if (require.main === module) {
    console.log(req.query);
  } else {
    const { event } = getCurrentInvoke();
    const { queryStringParameters } = event;
    console.log(queryStringParameters);
  }
  res.status(200).send(members);
});

// listenはLambdaで実行する場合は必要なく、ローカルで試験するときだけ必要。
if (require.main === module) {
  app.listen(port, () => console.log(`Example app membersening on port ${port}!`));
}
