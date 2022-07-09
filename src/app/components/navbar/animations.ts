import {
    animate,
    animation,
    query,
    sequence,
    stagger,
    style
  } from "@angular/animations";

  export const SidebarOpenAnimation = animation([
    style({ left: "-{{menuWidth}}" }),
    animate("{{animationDuration}}", style({ left: "0" })),

  ]);

  export const SidebarCloseAnimation = animation([
    style({ left: "0" }),
    animate("{{animationDuration}}", style({ left: "-{{menuWidth}}" }))

  ]);


  export const AccountMenuOpenAnimation = animation([
    style({height: '0' }),
    animate("{{animationDuration}}", style({ height: '*'  })),

  ]);

  export const AccountMenuCloseAnimation = animation([
    style({ height: '*' }),
    animate("{{animationDuration}}", style({ height: '0' }))

  ]);
