import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {screenMediaRule} from "../../common/utils";
import InspectionItemMobile from "./InspectionItemMobile";
import InspectionItem from "./InspectionItem";
import Text from "../inputs/Text";
import DropdownMenu from "../dropdownMenu";
import {options} from "./helpers";
import CustomButton from "../inputs/CustomButton";
import styles from "./styles";

const useStyles = makeStyles(styles);

function InspectionItems({load, audits}) {
  const {props: colorTheme, text} = useTheme();
  const media = screenMediaRule(730);

  const onSelectMenu = useCallback((auditId) => (value) => {
    const link = document.createElement("a");
    link.setAttribute("download", value + ".pdf");
    const params = new URLSearchParams();
    params.append("auditId", auditId);
    // TODO: передать параметры выбранного осмотра
    switch (value) {
      case "report":
        link.setAttribute("href", `/api/audit/report?${params.toString()}`);
        break;
      case "analyze":
        link.setAttribute("href", `/api/audit/analyze?${params.toString()}`);
        break;
      default:
        link.setAttribute("href", "#");
    }
    link.click();
  }, []);

  if (!load && audits?.length === 0) {
    return (
      <Text
        size={26}
        weight={300}>
        Осмотров нет
      </Text>
    );
  }

  if (!media) {
    return audits.map((item, index) => (
      <InspectionItem
        key={String(index)}
        index={index * 60}
        item={item}>
        <DropdownMenu
          onSelect={onSelectMenu(item.uuid)}
          list={options}>
          <CustomButton
            size={54}
            bg={colorTheme.GREY_LIGHT}>
            <MoreVertIcon htmlColor={text.primary} />
          </CustomButton>
        </DropdownMenu>
      </InspectionItem>
    ));
  }
  return audits.map((item, index) => (
    <InspectionItemMobile
      key={String(index)}
      index={index * 60}
      item={item}>
      <DropdownMenu
        onSelect={onSelectMenu(item.uuid)}
        list={options}>
        <CustomButton
          size={54}
          bg={colorTheme.GREY_LIGHT}>
          <MoreVertIcon htmlColor={text.primary} />
        </CustomButton>
      </DropdownMenu>
    </InspectionItemMobile>
  ));
}

InspectionItems.propTypes = {
  audits: PropTypes.arrayOf(PropTypes.shape({

  })),
  load: PropTypes.bool,
};

export default memo(InspectionItems);
