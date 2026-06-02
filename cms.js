/**
 * Ethereal Curator - Shared Local CMS State Manager
 * Uses LocalStorage to persist profile settings, essays, and artworks.
 */

const CMS_DEFAULT_PROFILE = {
    name: "Aesthete",
    bio: "Amidst the silence of the gallery, I find the echoes of distant worlds. Curator of light, shadow, and the spaces between words.",
    avatar: "https://lh3.googleusercontent.com/aida/ADBb0ugNErUfyEWDvSJHYEhHX61AaSnrzwNj0ker8nxV8AVCLFjSTf1mnCB-j4AcsRw8KzepabZrkQVk0xTI0EX30TQ4wBbsoX-KeHN77rDw8_-CqO6cNeWzfR3rK-h_4mbwCtl39S_cxX5TG_JfdKE5oZrL2ZsdyZLohbIVVTvwOBFbbTWSKzKJJrJLp9otkby3HCqiI8Gz33V_uyBeZj-IhiwCbOr1K4waprgjlWVpK1LGkZOPC9FK__pe5w",
    password: "admin"
};

const CMS_DEFAULT_ESSAYS = [
    {
        id: "default-1",
        title: "The Weight of Ink: Silence in Minimalist Expression",
        date: "2024.11.15",
        desc: "An exploration into how the void on a canvas dictates the resonance of a single brushstroke, and why we fear the empty page.",
        content: `In the quietest hours of the morning, before the digital world begins its cacophonous demand for attention, there exists a specific clarity. It is in this space that we find the intersection of ink and emptiness—a philosophical boundary where the presence of a mark only serves to define the vastness of the space it occupies.

The practice of the "Ethereal Curator" is not merely about collection, but about subtraction. In our modern age of surplus, the true luxury is the void. When we look at a blank canvas, we are not looking at a lack of content, but at a reservoir of potential. The mark of ink—the *sumi*—is an intrusion that must justify its existence against the purity of the unpainted paper.

> "True artistry lies not in what is added to the world, but in the precision of what is allowed to remain."

Consider the character **墨** (Ink). It is composed of the radicals for 'black' and 'earth'. It is a grounded substance, tactile and heavy. Yet, when applied with a brush, it becomes a vehicle for the lightest of thoughts. This tension between the material and the metaphysical is where our blog resides. We seek the heavy truths delivered with a light touch.

As you navigate these archives, we invite you to breathe with the text. Notice the margins. Observe the way the typography settles onto the digital page like paper resting on a wooden desk. In this long-form exploration, we reject the scroll-culture of the instant. We embrace the lingering eye.`,
        char: "墨",
        author: "Aura Vane",
        hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS8UjoKnNYqA105dSxiS44fPG_AmXcWIKeWPDJBeMpIBxTYuBoQPonxkjALXSNzhEpklABUHj7EpMJwa9Smw7kuSVzkURL9pIJ-at1CHwFR5IJ1eL-rVq4b2MAZ0yMrRSGDYapstlC1p2LxdRYCd-2cgTQSJgOuG62PkNl5pUvEku0xClT9snoRfHhthWaN8UNmv8d3NhwAPI3PVDR-ViYfHPg2xE1rIY8CZMz8iUEpmkDmeY8ZKfoq8MlbYtOOJKl1DhAeiykOQ"
    },
    {
        id: "default-2",
        title: "Topography of Thought: Mapping Creative Journeys",
        date: "2024.10.28",
        desc: "Tracing the jagged lines of inspiration from the initial spark to the finished artifact across the peaks of various mediums.",
        content: `Every creative artifact is a geographical record. It carries the marks of its elevation, the rivers of its changes, and the static weight of its completed peaks.

When we create, we map. We start in the lowlands of imitation, climbing slowly through the rocky passes of technique, hoping to catch a glimpse of the summit—that rare, thin air of pure original expression. But the journey is rarely linear. We double back, we fall into crevasses of self-doubt, we set up temporary camps in the safety of comfortable styles.

To map this topography is to understand that the finished work is only a snapshot of a landscape in motion. The process is the true landform.`,
        char: "山",
        author: "Aura Vane",
        hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOHSNXUnDW9XmfVSZB4IgPEH5kDwETBNI0MrF3_xDixOV3QqjHW9azhVS5__Bg3cxGPoGmviYgxbl3gcxSCQ2O6_Orn7tpRgJRbJhp9WrXzOfZO4oFkQVvA3Rt88DE1tQajO2e1OeQjT9gh3ZdnkxeVbvBtRuJ1Q9e7zSiowvu-WxJgy3kGV2qOmeYrv6L4KOL2sNyOZ9oD985ffgDt9j5hwlMh2nb9bG6FwRSEyz5rBEd6PRUKShNKa6dHrIi9FIDFUxuLA_6Aw"
    },
    {
        id: "default-3",
        title: "The First Light: Morning Rituals of the Mind",
        date: "2024.09.12",
        desc: "Why the clarity of dawn provides a unique frequency for deep thinking and the cultivation of intellectual resilience.",
        content: `Before the sun clears the horizon, the world is painted in shades of cool slate and deep indigo. This is the hour of the silent mind.

There is a clean frequency in the early morning that cannot be replicated. It is a space where the thoughts from yesterday have settled like dust, and the demands of today have not yet arrived. In this pristine window, we are allowed to think without the burden of reaction. We do not respond; we initiate.

By cultivating a ritual of silence at dawn, we build a fortress of mental resilience that carries us through the chaotic tides of the day.`,
        char: "曦",
        author: "Aura Vane",
        hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuDm2nWqr_T6UtWiYk37t_aIvr-tKJQhSW-UPnupv4wNCfTDP4GVfLQvjUyv5XdvPrUCUh3oeAowWmByaef5XNYMFogiMF1nRNrpKyz571fYXojnLlUwBJwsiNpUWRUWYeBD1nHWHfwkzB2-tBzxW0JUVhynLw8BFoybbtNbvAmtbxABsA0hfrdIiB5OVkPKa0WCwxZoqSrw3wCV4ff-6XT0H3nPWPDugNb7P_AF_cZflt8W3G7gFSpde_Kisra-gnrVde3SSkaPKA"
    },
    {
        id: "default-4",
        title: "Nocturnal Elegance: The Beauty of the Unseen",
        date: "2024.08.05",
        desc: "Considering the shadows as essential components of design, and how what we hide defines what we choose to show.",
        content: `In the darkness, the sharp edges of the world dissolve, leaving only the suggestion of form. This is where elegance resides.

Just as a painter uses shadows to give volume and mystery to a figure, a curator must use the unseen to define the curation. The items we choose *not* to display are just as critical as those we put under the glass. By leaving empty spaces and dark corners, we invite the viewer to participate in the creation of meaning, filling in the blanks with their own imagination.`,
        char: "月",
        author: "Aura Vane",
        hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS8UjoKnNYqA105dSxiS44fPG_AmXcWIKeWPDJBeMpIBxTYuBoQPonxkjALXSNzhEpklABUHj7EpMJwa9Smw7kuSVzkURL9pIJ-at1CHwFR5IJ1eL-rVq4b2MAZ0yMrRSGDYapstlC1p2LxdRYCd-2cgTQSJgOuG62PkNl5pUvEku0xClT9snoRfHhthWaN8UNmv8d3NhwAPI3PVDR-ViYfHPg2xE1rIY8CZMz8iUEpmkDmeY8ZKfoq8MlbYtOOJKl1DhAeiykOQ"
    }
];

const CMS_DEFAULT_ARTWORKS = [
    {
        id: "art-default-1",
        title: "Silence",
        date: "2024",
        medium: "Oil on Canvas",
        tags: "Minimalism, Fine Art",
        desc: "A moody, gnarled pine tree clinging to a misty mountain peak. Inspired by Sumi-e ink washes and modern brutalism.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYee5CLn7TZkeFGFcYRbrF0tqcxj3XbtICcr7d8N8ZoMomJuvQ3xh00lxqFK-VmtIb2pCPZVKjlBFCx7RNDIKKpwfI42F9X8YHt-MYubqylp7FpTuzYLoJ7Dl4K_ArGILFM9FRFBZySA4Fq0Vjm-nlyC-M6kSPQcL9s0HQkzKEnHUhNEc1MT1sitS3co7upbuSs06wmEkM_mohRzSKJOLMAB1qTIGOrk5fy8u-Pux_2SWw1tOCaNSQv7IXhFPpRiISTzhP6J1z-w"
    },
    {
        id: "art-default-2",
        title: "The Monolith",
        date: "2023",
        medium: "Mixed Media",
        tags: "Abstract, Geometry",
        desc: "A high-contrast study of scale, geometry, and stark shadows in concrete settings.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh6VyGoOq4WVCAO6ahdYE09sxGiI-7JA_kfo2FsbB_f75zfCYldWkXN5lUtMsmuQDzygRdrJGbe-m444qeUTVHHfjvwstwG_kDJo2UsummgvF6YfRtaaj8FT7lO4bsChTgNkYVsf6hq-x5wwLRhbpdjsaKJ-R_-WgTcqiVwW2JJIzqnQqJhu2lirD4ZCupwDmn9K87MV7kAm4tpwIhjf63QVmWD-yRiAjdKAnuJqGxh9xRSeLd9TDre0L8UGVxTDj8MC96steA7A"
    },
    {
        id: "art-default-3",
        title: "Morning Mist",
        date: "2024",
        medium: "Watercolor",
        tags: "Aqueous, Landscape",
        desc: "A fluid, soft expression of the quiet and light fog hanging over still waters.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo_La7EsE9E1O7QW3Nat5Ir84cEH-ja0W8Wo1IgMyfoo6n9WZrgCOiJcMWRzDUf-LhBGRl-qnUBkkMBgyzT0Sk0PEV-UChJUams5CRh2UdUNdgtvQNB6nbzDClRUcQHm6IEKJp3MdR1VPVeQec3hWR0ue7F9GX49Ue1rTmPE7sBQIe1qwFXfywaag6cOTV7GlSFrAYwvoOBDgUTk6SOxqoVr9fMKSODMDH8VADbP6vzPWHDoUO4V3RXFQZIypcfVTJ4WGZaPfcmg"
    },
    {
        id: "art-default-4",
        title: "The Tool",
        date: "2023",
        medium: "Digital Photography",
        tags: "Macro, Tactile",
        desc: "A macro close-up observation of ink meeting structural metal nib, celebrating the physical tools of thought.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD6n5qqQdOB2TF00jCJsKp4iNDHrgnUXKzhpkfeuuaUGvyVGx7hRf9qs88BArBodb1zoIo0T4p-LaQo1eOp0dpGYeCmzZ89qZ6RwDxv1mXWS517iEGe2uuzjh2NBrbp0iuRE450PYeKg6H_ewxyzx7vnt3qYCrKozF61tBCIbyKydzGzfkfeRipaIXTOSBUy16cPm3CTrh9uKLLw09TeuFbM4hOGFFjJurJg17uWy1shb7jwJErREj3uJKthWGKR5XLESuRRe3sg"
    }
];

const CMS_DEFAULT_MESSAGES = [
    {
        id: "msg-default-1",
        name: "Elias Thorne",
        email: "elias@example.com",
        message: "The curation here is like a breath of crisp mountain air. Thank you for maintaining such a serene corner of the web.",
        date: "2024.11.15"
    },
    {
        id: "msg-default-2",
        name: "Clara M.",
        email: "clara@example.com",
        message: "Stumbled upon the gallery while researching minimalism. The interplay of shadow and light in your latest essay really moved me.",
        date: "2024.10.12"
    },
    {
        id: "msg-default-3",
        name: "Julian Gray",
        email: "julian@example.com",
        message: "A rare find. Quiet luxury indeed.",
        date: "2024.10.05"
    }
];

function syncToServer() {
    if (typeof window !== 'undefined' && window.__CMS_DATA__) {
        return fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                profile: localStorage.getItem('aesthete_profile') ? JSON.parse(localStorage.getItem('aesthete_profile')) : null,
                essays: localStorage.getItem('aesthete_essays') ? JSON.parse(localStorage.getItem('aesthete_essays')) : [],
                artworks: localStorage.getItem('aesthete_artworks') ? JSON.parse(localStorage.getItem('aesthete_artworks')) : [],
                deleted_essays: localStorage.getItem('aesthete_deleted_essays') ? JSON.parse(localStorage.getItem('aesthete_deleted_essays')) : [],
                deleted_artworks: localStorage.getItem('aesthete_deleted_artworks') ? JSON.parse(localStorage.getItem('aesthete_deleted_artworks')) : [],
                messages: localStorage.getItem('aesthete_messages') ? JSON.parse(localStorage.getItem('aesthete_messages')) : [],
                deleted_messages: localStorage.getItem('aesthete_deleted_messages') ? JSON.parse(localStorage.getItem('aesthete_deleted_messages')) : []
            })
        })
        .then(res => res.json())
        .catch(err => {
            console.error("Error syncing database to server:", err);
            throw err;
        });
    }
    return Promise.resolve({ success: true, localOnly: true });
}

// Synchronize server database data into LocalStorage on load if __CMS_DATA__ is present
if (typeof window !== 'undefined' && window.__CMS_DATA__) {
    const data = window.__CMS_DATA__;
    
    // Check if server is completely unpopulated (fresh start) but client has existing data
    const clientHasData = localStorage.getItem('aesthete_essays') && JSON.parse(localStorage.getItem('aesthete_essays')).length > 0;
    const serverIsEmpty = (!data.essays || data.essays.length === 0) && (!data.artworks || data.artworks.length === 0);
    
    if (clientHasData && serverIsEmpty) {
        // Trigger sync from client to server so the server database gets populated with client's data!
        setTimeout(() => syncToServer(), 500);
    } else {
        // Standard pull from server to client
        if (data.profile) localStorage.setItem('aesthete_profile', JSON.stringify(data.profile));
        if (data.essays) localStorage.setItem('aesthete_essays', JSON.stringify(data.essays));
        if (data.artworks) localStorage.setItem('aesthete_artworks', JSON.stringify(data.artworks));
        if (data.deleted_essays) localStorage.setItem('aesthete_deleted_essays', JSON.stringify(data.deleted_essays));
        if (data.deleted_artworks) localStorage.setItem('aesthete_deleted_artworks', JSON.stringify(data.deleted_artworks));
        if (data.messages) localStorage.setItem('aesthete_messages', JSON.stringify(data.messages));
        if (data.deleted_messages) localStorage.setItem('aesthete_deleted_messages', JSON.stringify(data.deleted_messages));
    }
}

const cms = {
    getMessages() {
        const stored = localStorage.getItem('aesthete_messages');
        const custom = stored ? JSON.parse(stored) : [];
        const customIds = new Set(custom.map(m => m.id));
        const filteredDefaults = CMS_DEFAULT_MESSAGES.filter(m => !customIds.has(m.id));
        const allMessages = [...custom, ...filteredDefaults];

        // Filter out deleted messages
        const deletedStored = localStorage.getItem('aesthete_deleted_messages');
        const deleted = deletedStored ? JSON.parse(deletedStored) : [];
        return allMessages.filter(m => !deleted.includes(m.id));
    },

    addMessage(name, email, message) {
        const stored = localStorage.getItem('aesthete_messages');
        const custom = stored ? JSON.parse(stored) : [];

        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateString = `${yyyy}.${mm}.${dd}`;

        const newMsg = {
            id: 'msg-custom-' + Date.now(),
            name: name,
            email: email,
            message: message,
            date: dateString
        };

        custom.unshift(newMsg);
        localStorage.setItem('aesthete_messages', JSON.stringify(custom));
        return syncToServer().then(() => newMsg);
    },

    deleteMessage(id) {
        const stored = localStorage.getItem('aesthete_messages');
        let custom = stored ? JSON.parse(stored) : [];
        custom = custom.filter(m => m.id !== id);
        localStorage.setItem('aesthete_messages', JSON.stringify(custom));

        const deletedStored = localStorage.getItem('aesthete_deleted_messages');
        let deleted = deletedStored ? JSON.parse(deletedStored) : [];
        if (!deleted.includes(id)) {
            deleted.push(id);
            localStorage.setItem('aesthete_deleted_messages', JSON.stringify(deleted));
        }
        return syncToServer().then(() => true);
    },

    getProfile() {
        const stored = localStorage.getItem('aesthete_profile');
        return stored ? JSON.parse(stored) : CMS_DEFAULT_PROFILE;
    },

    saveProfile(name, bio, avatarBase64 = null, password = null) {
        const current = this.getProfile();
        const updated = {
            name: name || current.name,
            bio: bio || current.bio,
            avatar: avatarBase64 || current.avatar,
            password: password || current.password || "admin"
        };
        localStorage.setItem('aesthete_profile', JSON.stringify(updated));
        return syncToServer().then(() => updated);
    },

    getEssays() {
        const stored = localStorage.getItem('aesthete_essays');
        const custom = stored ? JSON.parse(stored) : [];
        const customIds = new Set(custom.map(e => e.id));
        const filteredDefaults = CMS_DEFAULT_ESSAYS.filter(e => !customIds.has(e.id));
        const allEssays = [...custom, ...filteredDefaults];

        // Filter out deleted essays (both custom and default ones)
        const deletedStored = localStorage.getItem('aesthete_deleted_essays');
        const deleted = deletedStored ? JSON.parse(deletedStored) : [];
        return allEssays.filter(e => !deleted.includes(e.id));
    },

    getEssayById(id) {
        const essays = this.getEssays();
        return essays.find(e => e.id === id) || CMS_DEFAULT_ESSAYS[0];
    },

    addEssay(title, content, char, heroBase64 = null) {
        const stored = localStorage.getItem('aesthete_essays');
        const custom = stored ? JSON.parse(stored) : [];
        
        // Generate snippet descriptions
        const cleanText = content.replace(/[#*>_\-`[\]()]/g, '');
        const desc = cleanText.substring(0, 120) + (cleanText.length > 120 ? '...' : '');

        // Deterministic, locale-independent date string YYYY.MM.DD
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateString = `${yyyy}.${mm}.${dd}`;

        const newEssay = {
            id: 'custom-' + Date.now(),
            title: title,
            date: dateString,
            desc: desc,
            content: content,
            char: char || '墨',
            author: this.getProfile().name,
            hero: heroBase64 || "https://lh3.googleusercontent.com/aida-public/AB6AXuAS8UjoKnNYqA105dSxiS44fPG_AmXcWIKeWPDJBeMpIBxTYuBoQPonxkjALXSNzhEpklABUHj7EpMJwa9Smw7kuSVzkURL9pIJ-at1CHwFR5IJ1eL-rVq4b2MAZ0yMrRSGDYapstlC1p2LxdRYCd-2cgTQSJgOuG62PkNl5pUvEku0xClT9snoRfHhthWaN8UNmv8d3NhwAPI3PVDR-ViYfHPg2xE1rIY8CZMz8iUEpmkDmeY8ZKfoq8MlbYtOOJKl1DhAeiykOQ"
        };

        custom.unshift(newEssay);
        localStorage.setItem('aesthete_essays', JSON.stringify(custom));
        return syncToServer().then(() => newEssay);
    },

    updateEssay(id, title, content, char, heroBase64 = null) {
        const stored = localStorage.getItem('aesthete_essays');
        let custom = stored ? JSON.parse(stored) : [];
        
        // Generate snippet descriptions
        const cleanText = content.replace(/[#*>_\-`[\]()]/g, '');
        const desc = cleanText.substring(0, 120) + (cleanText.length > 120 ? '...' : '');

        const idx = custom.findIndex(e => e.id === id);
        if (idx !== -1) {
            custom[idx].title = title;
            custom[idx].content = content;
            custom[idx].char = char || '墨';
            custom[idx].desc = desc;
            if (heroBase64) custom[idx].hero = heroBase64;
            localStorage.setItem('aesthete_essays', JSON.stringify(custom));
            return syncToServer().then(() => custom[idx]);
        } else {
            // Override a default essay in custom storage
            const defaultEssay = CMS_DEFAULT_ESSAYS.find(e => e.id === id);
            const overridden = {
                id: id,
                title: title,
                date: defaultEssay ? defaultEssay.date : '2024.11.15',
                desc: desc,
                content: content,
                char: char || '墨',
                author: defaultEssay ? defaultEssay.author : this.getProfile().name,
                hero: heroBase64 || (defaultEssay ? defaultEssay.hero : "https://lh3.googleusercontent.com/aida-public/AB6AXuAS8UjoKnNYqA105dSxiS44fPG_AmXcWIKeWPDJBeMpIBxTYuBoQPonxkjALXSNzhEpklABUHj7EpMJwa9Smw7kuSVzkURL9pIJ-at1CHwFR5IJ1eL-rVq4b2MAZ0yMrRSGDYapstlC1p2LxdRYCd-2cgTQSJgOuG62PkNl5pUvEku0xClT9snoRfHhthWaN8UNmv8d3NhwAPI3PVDR-ViYfHPg2xE1rIY8CZMz8iUEpmkDmeY8ZKfoq8MlbYtOOJKl1DhAeiykOQ")
            };
            custom.unshift(overridden);
            localStorage.setItem('aesthete_essays', JSON.stringify(custom));
            return syncToServer().then(() => overridden);
        }
    },

    deleteEssay(id) {
        // Remove from custom storage list if present
        const stored = localStorage.getItem('aesthete_essays');
        let custom = stored ? JSON.parse(stored) : [];
        custom = custom.filter(e => e.id !== id);
        localStorage.setItem('aesthete_essays', JSON.stringify(custom));

        // Add to global deleted ID set
        const deletedStored = localStorage.getItem('aesthete_deleted_essays');
        let deleted = deletedStored ? JSON.parse(deletedStored) : [];
        if (!deleted.includes(id)) {
            deleted.push(id);
            localStorage.setItem('aesthete_deleted_essays', JSON.stringify(deleted));
        }
        return syncToServer().then(() => true);
    },

    getArtworks() {
        const stored = localStorage.getItem('aesthete_artworks');
        const custom = stored ? JSON.parse(stored) : [];
        const customIds = new Set(custom.map(a => a.id));
        const filteredDefaults = CMS_DEFAULT_ARTWORKS.filter(a => !customIds.has(a.id));
        const allArt = [...custom, ...filteredDefaults];

        // Filter out deleted artworks
        const deletedStored = localStorage.getItem('aesthete_deleted_artworks');
        const deleted = deletedStored ? JSON.parse(deletedStored) : [];
        return allArt.filter(a => !deleted.includes(a.id));
    },

    addArtwork(title, date, medium, tags, desc, imageBase64) {
        const stored = localStorage.getItem('aesthete_artworks');
        const custom = stored ? JSON.parse(stored) : [];

        const newArt = {
            id: 'art-custom-' + Date.now(),
            title: title || 'Untitled',
            date: date || new Date().getFullYear().toString(),
            medium: medium || 'Mixed Media',
            tags: tags || 'Curated',
            desc: desc || '',
            image: imageBase64 || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYee5CLn7TZkeFGFcYRbrF0tqcxj3XbtICcr7d8N8ZoMomJuvQ3xh00lxqFK-VmtIb2pCPZVKjlBFCx7RNDIKKpwfI42F9X8YHt-MYubqylp7FpTuzYLoJ7Dl4K_ArGILFM9FRFBZySA4Fq0Vjm-nlyC-M6kSPQcL9s0HQkzKEnHUhNEc1MT1sitS3co7upbuSs06wmEkM_mohRzSKJOLMAB1qTIGOrk5fy8u-Pux_2SWw1tOCaNSQv7IXhFPpRiISTzhP6J1z-w'
        };

        custom.unshift(newArt);
        localStorage.setItem('aesthete_artworks', JSON.stringify(custom));
        return syncToServer().then(() => newArt);
    },

    deleteArtwork(id) {
        // Remove from custom list if present
        const stored = localStorage.getItem('aesthete_artworks');
        let custom = stored ? JSON.parse(stored) : [];
        custom = custom.filter(a => a.id !== id);
        localStorage.setItem('aesthete_artworks', JSON.stringify(custom));

        // Add to global deleted ID set
        const deletedStored = localStorage.getItem('aesthete_deleted_artworks');
        let deleted = deletedStored ? JSON.parse(deletedStored) : [];
        if (!deleted.includes(id)) {
            deleted.push(id);
            localStorage.setItem('aesthete_deleted_artworks', JSON.stringify(deleted));
        }
        return syncToServer().then(() => true);
    },

    // Premium image compression utility to prevent LocalStorage QuotaExceededError
    compressImage(fileOrBase64, maxWidth = 1200, maxHeight = 1200, quality = 0.75) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Export as compressed JPEG
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedBase64);
            };
            img.onerror = () => {
                // Fallback to original
                resolve(typeof fileOrBase64 === 'string' ? fileOrBase64 : '');
            };

            if (typeof fileOrBase64 === 'string') {
                img.src = fileOrBase64;
            } else if (fileOrBase64 instanceof File || fileOrBase64 instanceof Blob) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result;
                };
                reader.readAsDataURL(fileOrBase64);
            } else {
                resolve('');
            }
        });
    }
};
