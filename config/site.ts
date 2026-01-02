export type SiteConfig = {
    name: string
    description: string
    theme: "nail" | "spa" | "barber" | "tattoo" | "food"
    heroImage?: string
    mainNav: {
        title: string
        href: string
    }[]
    sections: {
        hero: boolean
        services: boolean
        gallery: boolean
        about: boolean
        reviews: boolean
        contact: boolean
    }
    contact: {
        phone: string
        address: string
        email: string
        zalo?: string
        facebook?: string // Added Facebook
        messenger?: string
        mapEmbedUrl?: string
    }
}

export const siteConfig: SiteConfig = {
    name: "Suwon 한식집",
    description: "Hương vị cơm nhà, đậm đà tình quê. Sự kết hợp tinh tế giữa ẩm thực Hàn Quốc và Cơm Tấm Việt Nam.",
    theme: "food",
    // heroImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=2600",
    heroImage: "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/470877910_555229747482677_1783485728988753423_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHcu0EFCBH_FA_VDNDeJfy47-lt1rmCS37v6W3WuYJLfo8tCz3ODGeh_SGpDTeja4-Dp9S0aWvzl_f4P6p1UBr7&_nc_ohc=6BDCyEvlMKAQ7kNvwHu2uYv&_nc_oc=AdlfF4352VHv6gYb4bXw3S4zAAQ6DhiLOpZ1bpDwt5YJJgK-zVxWk01rzR1Uq65brBs&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=4BQ7YBPx2ZgpMSPxrDtlXQ&oh=00_AfqyL2zsdwttTMQX904woyktMcFI-mmxdPfZQ071dgd7yQ&oe=695C859A",
    mainNav: [
        {
            title: "Thực Đơn",
            href: "#services",
        },
        {
            title: "Món Ngon",
            href: "#gallery",
        },
        {
            title: "Về Tiệm",
            href: "#about",
        },
        {
            title: "Đặt Bàn",
            href: "#contact",
        },
    ],
    sections: {
        hero: true,
        services: true,
        gallery: true,
        about: true,
        reviews: true,
        contact: true,
    },
    contact: {
        phone: "096 743 57 95",
        address: "Đường Hàm Nghi, phường Tân Phú, Đồng Xoài, Việt Nam",
        email: "hello@tiemcomnha.com",
        zalo: "https://zalo.me/0967435795",
        facebook: "https://www.facebook.com/profile.php?id=100089869695564",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.3132194994755!2d106.88092767458424!3d11.53985984464932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174a0417834fd49%3A0x95a292b2b8feb2dd!2zSMOgbSBOZ2hpLCBUw6JuIFBow7osIMSQ4buTbmcgWG_DoGksIELDrG5oIFBoxrDhu5tjLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1767283462091!5m2!1svi!2s"
    }
}
