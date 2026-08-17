import { cloneElement, type ReactElement, type HTMLAttributes } from "react";
import { cn } from "./cn";

type SlotProps = HTMLAttributes<HTMLElement> & {
  children: ReactElement<HTMLAttributes<HTMLElement>>;
};

// Minimális "asChild" megoldás radix-slot függőség nélkül: a Slot nem
// rendereli a saját elemét, hanem a props-jait ráolvasztja az egyetlen
// gyerekére (pl. <Button asChild><Link href="...">...</Link></Button>).
// A típus (ReactElement<HTMLAttributes<HTMLElement>>) már a fordítási
// időben kikényszeríti, hogy csak egyetlen valódi elem-gyerek kerülhessen
// ide — futásidejű isValidElement-ellenőrzés emiatt felesleges.
export default function Slot({ children, className, style, ...props }: SlotProps) {
  return cloneElement(children, {
    ...props,
    ...children.props,
    className: cn(className, children.props.className),
    style: { ...style, ...children.props.style },
  });
}
