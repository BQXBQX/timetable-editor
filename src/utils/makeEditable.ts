import { Text } from "konva/lib/shapes/Text";
import { Stage } from "konva/lib/Stage";
import { RefObject } from "react";

export function makeEditable(textNode: Text, stageRef: RefObject<Stage>) {
  textNode.on("dblclick", () => {
    textNode.hide();

    const titlePosition = textNode.position();

    const textAreaPosition = {
      x: stageRef.current!.container().offsetLeft + titlePosition.x,
      y: stageRef.current!.container().offsetTop + titlePosition.y,
    };

    const textarea = document.createElement("textarea");
    document.body.append(textarea);

    // css handle
    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = textAreaPosition.y + "px";
    textarea.style.left = textAreaPosition.x + "px";
    textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
    textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + "px";
    textarea.style.fontSize = textNode.fontSize() + "px";
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = textNode.lineHeight().toString();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill().toString();
    textarea.focus();

    function removeTextarea() {
      textarea.parentNode!.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      textNode.show();
    }

    function handleOutsideClick(e: MouseEvent) {
      console.log(e.target);
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        removeTextarea();
      }
    }

    textarea.addEventListener("keydown", function(e: KeyboardEvent) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.key === "Enter" && !e.shiftKey) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.key === "Escape") {
        removeTextarea();
      }
    });

    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  });
}
