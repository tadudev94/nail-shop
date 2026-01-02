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
    name: "Avocado Spa & Skin Care",
    description: "“Không gian thư giãn và tái tạo năng lượng của bạn. Trải nghiệm các liệu trình chăm sóc da hữu cơ cao cấp và những liệu pháp massage êm dịu.”",
    theme: "spa",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2600", // Spa/Massage image
    mainNav: [
        {
            title: "Dịch Vụ",
            href: "#services",
        },
        {
            title: "Không Gian",
            href: "#gallery",
        },
        {
            title: "Về Chúng Tôi",
            href: "#about",
        },
        {
            title: "Đặt Lịch",
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
        phone: "096 743 XXXX",
        address: "Avocado Skincare 60 Phan Huy Ích, Tân Phú, Đồng Xoài, Bình Phước", // Updated example address
        email: "booking@avocado.com",
        zalo: "https://zalo.me/096743XXXX",
        facebook: "https://www.facebook.com/profile.php?id=61563770278945",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1789.1154824734938!2d106.89874869325409!3d11.546308630669976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317361002c88967d%3A0xe0b4ba9d94f50a82!2sAvocado%20Skincare!5e1!3m2!1svi!2s!4v1767344531037!5m2!1svi!2s"
    }
}
