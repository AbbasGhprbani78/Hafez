import { Col, Row } from "react-bootstrap";
import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import styles from "./FundItem.module.css";
import { useParams } from "react-router-dom";
import Accardion from "../../Components/Modules/Accardion/Accardion";
import SumItem from "../../Components/Modules/SumItem/SumItem";

export default function FundItem() {
  const { id } = useParams();

  console.log(id);
  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content">
          <Header title={"کارتابل صندوق پذیرش :"} />
          <div className={styles.wrapper_info}>
            <p className={styles.title}>مشخصات خودرو :</p>
            <Row className={`${styles.content} gx-2`}>
              <Col xs={12} md={6} lg={3} className={styles.item_content}>
                <span className={styles.key_item}>شماره شاسی :</span>
                <span className={styles.value_item}>dsfdg518h4956f</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={styles.item_content}>
                <span className={styles.key_item}>شماره موتور :</span>
                <span className={styles.value_item}>7521</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={styles.item_content}>
                <span className={styles.key_item}>تاریخ شروع گارانتی :</span>
                <span className={styles.value_item}>10/05/25</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={styles.item_content}>
                <span className={styles.key_item}>رنگ :</span>
                <span className={styles.value_item}>سفید</span>
              </Col>
            </Row>
          </div>
          <div className={styles.wrapper_info}>
            <p className={styles.title}>اطلاعات پذیرش :</p>
            <Row className={`${styles.content} gx-2`}>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>شماره پذیرش :</span>
                <span className={styles.value_item}>12444956f</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>کیلومتر :</span>
                <span className={styles.value_item}>7521</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>پلاک :</span>
                <span className={styles.value_item}>64ط258 ایران 13</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>تاریخ و زمان پذیرش :</span>
                <span className={styles.value_item}>1403/12/7</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>زمان تخمینی:</span>
                <span className={styles.value_item}>1403/12/19</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>هزینه تخمینی :</span>
                <span className={styles.value_item}>200.000.000</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>شماره هرم :</span>
                <span className={styles.value_item}>20000</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>توضیحات :</span>
                <span className={styles.value_item}></span>
              </Col>
            </Row>
          </div>
          <div className={styles.wrapper_info}>
            <p className={styles.title}>اطلاعات مشتری :</p>
            <Row className={`${styles.content} gx-2`}>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>نام :</span>
                <span className={styles.value_item}>لیلا</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>نام خانوادگی :</span>
                <span className={styles.value_item}>سعیدی</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>کد ملی :</span>
                <span className={styles.value_item}>1234567890</span>
              </Col>
              <Col xs={12} md={6} lg={3} className={`${styles.item_content}`}>
                <span className={styles.key_item}>تلفن همراه :</span>
                <span className={styles.value_item}>09162957253</span>
              </Col>
            </Row>
          </div>
          <Row className="gx-2 mt-4 mb-5">
            <Col xs={12} md={6} className={styles.payment_method}>
              <div className={styles.wrap_accardions}>
                <Accardion title={"انتخاب تخفیف"} />
                <Accardion title={"پرداخت چک"} />
                <Accardion title={"پرداخت نقدی"} />
              </div>
              <div className={styles.prices_wrapper}>
                <SumItem title={"پیش پرداخت"} price={1200000} />
                <SumItem title={"جمع پرداختی"} price={1200000} />
                <SumItem title={"جمع پرداختی"} price={1200000} color={"color"}/>
              </div>
            </Col>
            <Col xs={12} md={6} className={styles.invoice}></Col>
          </Row>
        </div>
      </div>
    </>
  );
}
