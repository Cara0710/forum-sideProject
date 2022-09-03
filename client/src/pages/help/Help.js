import React from "react";

const Help = () => {
  return (
    <div className="help">
      <div className="help-box">
        <h1>Ⅰ 網頁介紹</h1>
        <div>
          <p>此網頁是為了減少求職被詐騙的情況而開發而成的一個自由小論壇。</p>
          <p>
            如果您對於即將求職的公司有安全疑慮的問題，歡迎您在此提出討論，透過評分危險指數的留言機制，系統會自動幫你算出您貼文下所有留言的危險程度平均值，並用顏色即時呈顯出來，讓你的疑問有效率的獲得解答，
            改善以往其他平台無法快速總結留言的缺點，希望能藉此，減少台灣人被詐騙的機率。
          </p>
        </div>
      </div>
      <div className="help-box">
        <h1>Ⅱ 使用說明</h1>
        <div>
          <p>危險程度顏色判別分為以下四種:</p>
          <div className="infor-box">
            <div className="white"></div>
            <p>未分區: 尚未有人評分過</p>
          </div>
          <div className="infor-box">
            <div className="safe"></div>
            <p>
              安全區:
              危險指數平均值在1~5之間，此間公司大機率安全，可以去面試，但還是要小心注意。
            </p>
          </div>
          <div className="infor-box">
            <div className="warn"></div>
            <p>
              警告區:
              危險指數平均值在5~7.5之間，此間公司有機率是詐騙，需要在多多觀察，再做決定。
            </p>
          </div>
          <div className="infor-box">
            <div className="dangerous"></div>
            <p>
              危險區:
              危險指數平均值在7.5~10之間，此間公司大機率是詐騙，強烈推薦你不要去。
            </p>
          </div>
        </div>
      </div>
      <div className="help-box">
        <h1>Ⅲ 注意事項</h1>
        <div>
          <p>
            1.無論您是要Po文還是留言，都請注意基本禮貌，請勿人身攻擊，政治引戰，髒話謾罵。
          </p>
          <p>
            2.您所發表的任何言論，都將影響到他人就業安全，請勿發表不實資訊。
          </p>
          <p>3.此網站為個人開發小作品，若有對資安敏感者，請勿使用。</p>
          <p>
            4.此網站得出結論僅供參考，這只能幫助你了解情況，正不正確必須由你自己判斷。
          </p>
        </div>
      </div>
      <div className="help-box">
        <h1>Ⅳ 聯絡我</h1>
        <div>
          <p>
            如果對此網站有更好的想法，或是發現有誤時，歡迎聯絡此信箱@whoamiso121@gmail.com😁😁
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
