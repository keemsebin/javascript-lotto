import "../step2-web/components/common/Layout/layout.css";
import "../step2-web/components/common/Colors/colors.css";
import "../step2-web/components/common/Box/box.css";
import "../step2-web/components/common/Text/text.css";
import "../step2-web/components/common/Button/button.css";
import "../step2-web/components/common/Modal/modal.css";
import "../step2-web/components/common/Table/table.css";
import "../step2-web/components/common/Style/flex.css";
import "../step2-web/components/common/Input/input.css";
import "../step2-web/components/feature/Header/header.css";
import "../step2-web/components/feature/Footer/footer.css";
import "../step2-web/components/feature/LottoShop/lottoShop.css";
import Header from "../step2-web/components/feature/Header/Header";
import LottoShop from "../step2-web/components/feature/LottoShop/LottoShop";
import Footer from "../step2-web/components/feature/Footer/Footer";

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = new Header();

  const lottoShop = new LottoShop();

  const footer = new Footer();

  header.setProps({ containerId: "header-container" });
  lottoShop.setProps({ containerId: "lotto-shop-container" });
  footer.setProps({ containerId: "footer-container" });

  header.render();
  lottoShop.render();
  footer.render();
});
