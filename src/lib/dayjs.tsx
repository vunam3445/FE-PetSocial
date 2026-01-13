import dayjs from "dayjs";
import "dayjs/locale/vi"; // import ngôn ngữ tiếng Việt
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("vi"); // đặt ngôn ngữ mặc định là tiếng Việt
export default dayjs;