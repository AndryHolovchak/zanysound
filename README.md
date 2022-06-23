**Zanysound** provides access to your Deezer library and allows you to **listen to music without Deezer premium**

## Instruction

Run `npm i` and `npm start`

In order to run the website outside RN webview, start [the back-end server](https://github.com/AndryHolovchak/zanysound-backend) and specify back-end URL in .env file (see environment variables section).
<br/>
If you wish to use this website inside RN webview, follow the instruction for this [React Native container](https://github.com/AndryHolovchak/zanysound-native)

### Environment variables

REACT_APP_DZ_APP_ID - Deezer app ID <br/>
REACT_APP_BACKEND_URL - [back-end URL](https://github.com/AndryHolovchak/zanysound-backend) (If you want to run the website outside React Native webview)
