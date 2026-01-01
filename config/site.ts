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
    name: "Muse Nail & Spa",
    description: "Nâng niu vẻ đẹp đôi bàn tay bạn với dịch vụ chăm sóc móng chuyên nghiệp và không gian thư giãn tuyệt vời.",
    theme: "nail",
    heroImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=2070",
    mainNav: [
        {
            title: "Dịch vụ",
            href: "#services",
        },
        {
            title: "Bộ sưu tập",
            href: "#gallery",
        },
        {
            title: "Về chúng tôi",
            href: "#about",
        },
        {
            title: "Liên hệ",
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
        phone: "090 123 4567",
        address: "123 Đường Nguyễn Huệ, Quận 1, TP. HCM",
        email: "booking@musenail.com",
        zalo: "https://zalo.me/0901234567",
        facebook: "https://facebook.com/musenail",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.70175557480469!3d10.773374289375193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f442a7f6f99%3A0x548bd8251e605d23!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1709234567890!5m2!1sen!2s"
    }
}
