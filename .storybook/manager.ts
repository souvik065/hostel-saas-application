import {addons} from "@storybook/manager-api"
import {create} from "@storybook/theming"

addons.setConfig({
    theme: create({
        base:"dark",
        brandTitle : "Krewbee",
        brandUrl : "https://www.google.co.in/",
        brandImage:"https://web.originalcrew.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdark.a616676c.png&w=1920&q=75",
        brandTarget:"_self"
    })
})

