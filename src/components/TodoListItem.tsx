import Button from "./html/Button";
import Checkbox from "./html/Checkbox";
import SvgClose from "./svg/SvgClose";
import SvgPencil from "./svg/SvgPencil";
import Input from "./html/Input";

export default function TodoListItem() {
  return (
    // 할 일이 완료되면 .todo__item--complete 추가
    <li className={`todo__item`}>
      <Checkbox
        parentClassName="todo__checkbox-group"
        type="checkbox"
        className="todo__checkbox"
      >
        아침먹기
      </Checkbox>
      {/* 할 일을 수정할 때만 노출 (.todo__checkbox-group은 비노출) */}
      {/* <Input type="text" className="todo__modify-input" /> */}
      <div className="todo__button-group">
        <Button className="todo__action-button">
          <SvgPencil />
        </Button>
        <Button className="todo__action-button">
          <SvgClose />
        </Button>
      </div>
    </li>
  );
}
