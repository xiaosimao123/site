import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import { isExternalUrl } from "@/lib/utils/helpers";
import { NavLink } from "./MainNavigation";

export function HoverMenu() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <a
          className="group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none
text-slate-600 hover:bg-gray-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-gray-900 dark:hover:text-slate-200"
          href=""
        >
          <span className="">content</span>
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="flex flex-col gap-[7px]">
            <Image
              className="block h-[60px] w-[60px] rounded-full"
              src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
              alt="Radix UI"
            />
            <div className="flex flex-col gap-[15px]">
              <div>
                <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                  Radix
                </div>
                <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
                  @radix_ui
                </div>
              </div>
              <div className="text-mauve12 m-0 text-[15px] leading-[1.5]">
                Components, icons, colors, and templates for building
                high-quality, accessible UI. Free and open-source.
              </div>
              <div className="flex gap-[15px]">
                <div className="flex gap-[5px]">
                  <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                    0
                  </div>{" "}
                  <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
                    Following
                  </div>
                </div>
                <div className="flex gap-[5px]">
                  <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                    2,900
                  </div>{" "}
                  <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
                    Followers
                  </div>
                </div>
              </div>
            </div>
          </div>

          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
