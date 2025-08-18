// E-Bike Rental App Scaffold Plugin
// Generates a set of screens and components for an e-bike rental app

;(async () => {
	try {
		await loadFonts()

		const page = figma.createPage()
		page.name = "E-Bike App"
		figma.currentPage = page

		const rootFrame = createAutoLayoutFrame({
			name: "E-Bike App - Screens",
			layoutMode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "AUTO",
			itemSpacing: 48,
			padding: 0,
			fills: []
		})
		page.appendChild(rootFrame)

		const styles = createSharedStyles()
		const library = createComponentLibrary(styles)
		page.appendChild(library)
		library.x = -1200
		library.y = 0

		const screens = [
			createSplashScreen(styles, library),
			createOnboardingScreen(styles, library),
			createAuthScreen(styles, library),
			createHomeScreen(styles, library),
			createBikeDetailScreen(styles, library),
			createBookingScreen(styles, library),
			createPaymentScreen(styles, library),
			createRideInProgressScreen(styles, library),
			createEndRideScreen(styles, library),
			createHistoryScreen(styles, library),
			createWalletScreen(styles, library),
			createProfileScreen(styles, library),
			createRepairRequestScreen(styles, library),
			createSupportScreen(styles, library),
			createSettingsScreen(styles, library),
			createNotificationsScreen(styles, library)
		]

		for (const frame of screens) {
			rootFrame.appendChild(frame)
		}

		figma.viewport.scrollAndZoomIntoView([rootFrame])
		figma.notify("E-Bike app screens created")
	} catch (err) {
		console.error(err)
		figma.notify("Failed to generate app: " + (err && err.message ? err.message : "Unknown error"))
	} finally {
		figma.closePlugin()
	}
})()

function createSharedStyles() {
	const colors = {
		primary: { r: 0.09, g: 0.63, b: 0.52 }, // teal 600
		primaryDark: { r: 0.07, g: 0.50, b: 0.42 },
		bg: { r: 0.97, g: 0.98, b: 1.0 },
		text: { r: 0.08, g: 0.10, b: 0.12 },
		subtext: { r: 0.35, g: 0.39, b: 0.45 },
		muted: { r: 0.92, g: 0.94, b: 0.96 },
		warning: { r: 1.0, g: 0.76, b: 0.20 },
		danger: { r: 0.92, g: 0.26, b: 0.24 }
	}

	return { colors }
}

async function loadFonts() {
	await figma.loadFontAsync({ family: "Inter", style: "Regular" })
	await figma.loadFontAsync({ family: "Inter", style: "Medium" })
	await figma.loadFontAsync({ family: "Inter", style: "Bold" })
}

function createAutoLayoutFrame(opts) {
	const frame = figma.createFrame()
	frame.name = opts.name || "Frame"
	frame.layoutMode = opts.layoutMode || "VERTICAL"
	frame.primaryAxisSizingMode = opts.primaryAxisSizingMode || "AUTO"
	frame.counterAxisSizingMode = opts.counterAxisSizingMode || "AUTO"
	frame.itemSpacing = opts.itemSpacing ?? 12
	frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = opts.padding ?? 16
	frame.fills = opts.fills ?? [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
	frame.strokeWeight = 0
	frame.cornerRadius = opts.cornerRadius ?? 0
	return frame
}

function createTextNode(text, opts = {}) {
	const t = figma.createText()
	t.characters = text
	t.fontName = opts.fontName || { family: "Inter", style: "Regular" }
	t.fontSize = opts.fontSize ?? 16
	t.fills = [{ type: "SOLID", color: opts.color || { r: 0, g: 0, b: 0 } }]
	t.lineHeight = { unit: "AUTO" }
	return t
}

function createButton(label, variant, styles) {
	const isPrimary = variant !== "secondary"
	const btn = createAutoLayoutFrame({
		name: `Button/${isPrimary ? "Primary" : "Secondary"}`,
		layoutMode: "HORIZONTAL",
		primaryAxisSizingMode: "AUTO",
		counterAxisSizingMode: "AUTO",
		itemSpacing: 8,
		padding: 14,
		fills: [{ type: "SOLID", color: isPrimary ? styles.colors.primary : styles.colors.muted }],
		cornerRadius: 12
	})
	const icon = figma.createRectangle()
	icon.resize(18, 18)
	icon.cornerRadius = 4
	icon.fills = [{ type: "SOLID", color: isPrimary ? styles.colors.primaryDark : { r: 0.82, g: 0.86, b: 0.90 } }]
	const text = createTextNode(label, {
		fontName: { family: "Inter", style: "Bold" },
		fontSize: 16,
		color: isPrimary ? { r: 1, g: 1, b: 1 } : styles.colors.text
	})
	btn.appendChild(icon)
	btn.appendChild(text)
	return btn
}

function createInput(label, placeholder, styles) {
	const field = createAutoLayoutFrame({
		name: "InputField",
		layoutMode: "VERTICAL",
		itemSpacing: 8,
		padding: 0,
		fills: []
	})
	const lab = createTextNode(label, {
		fontSize: 12,
		color: styles.colors.subtext
	})
	const box = createAutoLayoutFrame({
		name: "Input",
		layoutMode: "HORIZONTAL",
		itemSpacing: 8,
		padding: 14,
		fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
		cornerRadius: 12
	})
	box.strokes = [{ type: "SOLID", color: styles.colors.muted }]
	box.strokeWeight = 1
	const icon = figma.createRectangle()
	icon.resize(18, 18)
	icon.cornerRadius = 4
	icon.fills = [{ type: "SOLID", color: { r: 0.86, g: 0.90, b: 0.94 } }]
	const ph = createTextNode(placeholder, { color: styles.colors.subtext })
	box.appendChild(icon)
	box.appendChild(ph)
	field.appendChild(lab)
	field.appendChild(box)
	return field
}

function createCard(title, subtitle, price, styles) {
	const card = createAutoLayoutFrame({
		name: "BikeCard",
		layoutMode: "HORIZONTAL",
		itemSpacing: 12,
		padding: 12,
		cornerRadius: 16
	})
	card.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.96 } }]
	card.strokeWeight = 1
	const thumb = figma.createRectangle()
	thumb.resize(80, 80)
	thumb.cornerRadius = 12
	thumb.fills = [{ type: "SOLID", color: { r: 0.86, g: 0.90, b: 0.94 } }]
	const column = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 6, padding: 0, fills: [] })
	const t = createTextNode(title, { fontName: { family: "Inter", style: "Bold" }, fontSize: 16, color: styles.colors.text })
	const s = createTextNode(subtitle, { fontSize: 12, color: styles.colors.subtext })
	const p = createTextNode(price, { fontName: { family: "Inter", style: "Bold" }, fontSize: 14, color: styles.colors.primary })
	column.appendChild(t)
	column.appendChild(s)
	column.appendChild(p)
	card.appendChild(thumb)
	card.appendChild(column)
	return card
}

function phoneScreenFrame(title, styles) {
	const frame = createAutoLayoutFrame({
		name: title,
		layoutMode: "VERTICAL",
		itemSpacing: 16,
		padding: 16
	})
	frame.resize(390, 844)
	frame.fills = [{ type: "SOLID", color: styles.colors.bg }]
	frame.cornerRadius = 36
	frame.strokes = [{ type: "SOLID", color: { r: 0.93, g: 0.95, b: 0.98 } }]
	frame.strokeWeight = 1
	return frame
}

function topBar(title, styles) {
	const bar = createAutoLayoutFrame({
		name: "TopBar",
		layoutMode: "HORIZONTAL",
		itemSpacing: 12,
		padding: 0,
		fills: []
	})
	const dot = figma.createEllipse()
	dot.resize(8, 8)
	dot.fills = [{ type: "SOLID", color: styles.colors.primary }]
	const t = createTextNode(title, { fontName: { family: "Inter", style: "Bold" }, fontSize: 18, color: styles.colors.text })
	bar.appendChild(dot)
	bar.appendChild(t)
	return bar
}

function bottomNav(styles) {
	const nav = createAutoLayoutFrame({
		name: "BottomNav",
		layoutMode: "HORIZONTAL",
		itemSpacing: 8,
		padding: 12,
		fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
		cornerRadius: 24
	})
	nav.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.96 } }]
	nav.strokeWeight = 1

	const item = (label, active) => {
		const it = createAutoLayoutFrame({ layoutMode: "HORIZONTAL", itemSpacing: 6, padding: 10, fills: active ? [{ type: "SOLID", color: styles.colors.muted }] : [] , cornerRadius: 12 })
		const ic = figma.createRectangle()
		ic.resize(18, 18)
		ic.cornerRadius = 4
		ic.fills = [{ type: "SOLID", color: active ? styles.colors.primary : { r: 0.86, g: 0.90, b: 0.94 } }]
		const tx = createTextNode(label, { fontSize: 12, color: active ? styles.colors.text : styles.colors.subtext })
		it.appendChild(ic)
		it.appendChild(tx)
		return it
	}

	nav.appendChild(item("خانه", true))
	nav.appendChild(item("کیف‌پول", false))
	nav.appendChild(item("رزروها", false))
	nav.appendChild(item("پروفایل", false))
	return nav
}

function createComponentLibrary(styles) {
	const lib = createAutoLayoutFrame({ name: "Library", layoutMode: "VERTICAL", itemSpacing: 16, padding: 16 })
	const title = createTextNode("Library Components", { fontName: { family: "Inter", style: "Bold" }, fontSize: 18, color: styles.colors.text })
	lib.appendChild(title)
	lib.appendChild(createButton("Primary", "primary", styles))
	lib.appendChild(createButton("Secondary", "secondary", styles))
	lib.appendChild(createInput("جستجو", "دوچرخه یا ایستگاه", styles))
	lib.appendChild(createCard("E-Bike Urban Pro", "۴۵ کیلومتر برد | نزدیک‌ترین ایستگاه: ونک", "۴۵٬۰۰۰ تومان/ساعت", styles))
	return lib
}

function createSplashScreen(styles) {
	const frame = phoneScreenFrame("Splash", styles)
	const logo = figma.createEllipse()
	logo.resize(96, 96)
	logo.fills = [{ type: "SOLID", color: styles.colors.primary }]
	const app = createTextNode("E-Bike", { fontName: { family: "Inter", style: "Bold" }, fontSize: 28, color: styles.colors.text })
	const tagline = createTextNode("کرایه سریع، سفر سبز", { fontSize: 14, color: styles.colors.subtext })
	frame.appendChild(logo)
	frame.appendChild(app)
	frame.appendChild(tagline)
	return frame
}

function createOnboardingScreen(styles) {
	const frame = phoneScreenFrame("Onboarding", styles)
	frame.appendChild(topBar("شروع تجربه", styles))
	const illo = figma.createRectangle()
	illo.resize(300, 200)
	illo.cornerRadius = 24
	illo.fills = [{ type: "SOLID", color: { r: 0.86, g: 0.90, b: 0.94 } }]
	frame.appendChild(illo)
	frame.appendChild(createTextNode("دوچرخه برقی نزدیک شما", { fontName: { family: "Inter", style: "Bold" }, fontSize: 20, color: styles.colors.text }))
	frame.appendChild(createTextNode("دوچرخه پیدا کنید، رزرو کنید و حرکت کنید.", { fontSize: 14, color: styles.colors.subtext }))
	frame.appendChild(createButton("ادامه", "primary", styles))
	return frame
}

function createAuthScreen(styles) {
	const frame = phoneScreenFrame("Auth", styles)
	frame.appendChild(topBar("ورود/ثبت‌نام", styles))
	frame.appendChild(createInput("شماره موبایل", "09xxxxxxxxx", styles))
	frame.appendChild(createInput("کد تایید", "123456", styles))
	frame.appendChild(createButton("ورود", "primary", styles))
	frame.appendChild(createTextNode("با ورود، شرایط استفاده را می‌پذیرید.", { fontSize: 12, color: styles.colors.subtext }))
	return frame
}

function createHomeScreen(styles) {
	const frame = phoneScreenFrame("Home", styles)
	frame.appendChild(topBar("خانه", styles))
	frame.appendChild(createInput("جستجو", "ایستگاه یا دوچرخه", styles))
	const map = figma.createRectangle()
	map.resize(358, 320)
	map.cornerRadius = 16
	map.fills = [{ type: "SOLID", color: { r: 0.90, g: 0.95, b: 0.95 } }]
	frame.appendChild(map)
	const list = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 12, padding: 0, fills: [] })
	list.appendChild(createCard("E-Bike City", "برد ۴۰ کیلومتر | ۳ دقیقه تا شما", "۳۹٬۰۰۰ تومان/ساعت", styles))
	list.appendChild(createCard("E-Bike Pro", "برد ۵۵ کیلومتر | ۵ دقیقه تا شما", "۴۹٬۰۰۰ تومان/ساعت", styles))
	list.appendChild(createCard("E-Scooter Mini", "برد ۲۵ کیلومتر | ۲ دقیقه تا شما", "۲۹٬۰۰۰ تومان/ساعت", styles))
	frame.appendChild(list)
	frame.appendChild(bottomNav(styles))
	return frame
}

function createBikeDetailScreen(styles) {
	const frame = phoneScreenFrame("Bike Detail", styles)
	frame.appendChild(topBar("E-Bike Pro", styles))
	const hero = figma.createRectangle()
	hero.resize(358, 220)
	hero.cornerRadius = 16
	hero.fills = [{ type: "SOLID", color: { r: 0.86, g: 0.90, b: 0.94 } }]
	frame.appendChild(hero)
	frame.appendChild(createTextNode("برد: ۵۵ کیلومتر | سرعت: ۲۵km/h", { fontSize: 14, color: styles.colors.subtext }))
	frame.appendChild(createButton("رزرو", "primary", styles))
	return frame
}

function createBookingScreen(styles) {
	const frame = phoneScreenFrame("Booking", styles)
	frame.appendChild(topBar("رزرو", styles))
	frame.appendChild(createInput("زمان", "۱ ساعت", styles))
	frame.appendChild(createInput("ایستگاه تحویل", "پارک ملت", styles))
	frame.appendChild(createInput("ایستگاه بازگشت", "هر مکان", styles))
	frame.appendChild(createButton("تایید و ادامه", "primary", styles))
	return frame
}

function createPaymentScreen(styles) {
	const frame = phoneScreenFrame("Payment", styles)
	frame.appendChild(topBar("پرداخت", styles))
	frame.appendChild(createInput("کوپن تخفیف", "کد را وارد کنید", styles))
	const summary = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 8, padding: 12, cornerRadius: 12 })
	summary.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.96 } }]
	summary.strokeWeight = 1
	summary.appendChild(createTextNode("جمع کل: ۴۹٬۰۰۰ تومان", { fontName: { family: "Inter", style: "Bold" }, fontSize: 16, color: styles.colors.text }))
	summary.appendChild(createTextNode("شامل بیمه و مالیات", { fontSize: 12, color: styles.colors.subtext }))
	frame.appendChild(summary)
	frame.appendChild(createButton("پرداخت", "primary", styles))
	return frame
}

function createRideInProgressScreen(styles) {
	const frame = phoneScreenFrame("Ride In Progress", styles)
	frame.appendChild(topBar("در حال سفر", styles))
	const stats = createAutoLayoutFrame({ layoutMode: "HORIZONTAL", itemSpacing: 16, padding: 12, cornerRadius: 12 })
	stats.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.96 } }]
	stats.strokeWeight = 1
	stats.appendChild(createTextNode("زمان: ۰۰:۱۵", { fontSize: 14 }))
	stats.appendChild(createTextNode("مسافت: ۳.۲km", { fontSize: 14 }))
	stats.appendChild(createTextNode("باتری: ۸۰%", { fontSize: 14 }))
	frame.appendChild(stats)
	frame.appendChild(createButton("پایان سفر", "secondary", styles))
	return frame
}

function createEndRideScreen(styles) {
	const frame = phoneScreenFrame("End Ride", styles)
	frame.appendChild(topBar("پایان سفر", styles))
	frame.appendChild(createTextNode("هزینه نهایی: ۲۹٬۰۰۰ تومان", { fontName: { family: "Inter", style: "Bold" }, fontSize: 18 }))
	frame.appendChild(createButton("پرداخت و امتیازدهی", "primary", styles))
	return frame
}

function createHistoryScreen(styles) {
	const frame = phoneScreenFrame("History", styles)
	frame.appendChild(topBar("سوابق", styles))
	const list = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 10, padding: 0, fills: [] })
	for (const i of [1,2,3]) {
		list.appendChild(createCard(`E-Bike Urban ${i}`, "دیروز | ۴.۳km", "۲۴٬۰۰۰ تومان", styles))
	}
	frame.appendChild(list)
	return frame
}

function createWalletScreen(styles) {
	const frame = phoneScreenFrame("Wallet", styles)
	frame.appendChild(topBar("کیف‌پول", styles))
	const balance = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 6, padding: 12, cornerRadius: 12 })
	balance.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.96 } }]
	balance.strokeWeight = 1
	balance.appendChild(createTextNode("موجودی: ۱۲۳٬۰۰۰ تومان", { fontName: { family: "Inter", style: "Bold" }, fontSize: 16 }))
	balance.appendChild(createButton("شارژ کیف‌پول", "primary", styles))
	frame.appendChild(balance)
	return frame
}

function createProfileScreen(styles) {
	const frame = phoneScreenFrame("Profile", styles)
	frame.appendChild(topBar("پروفایل", styles))
	const avatar = figma.createEllipse()
	avatar.resize(72, 72)
	avatar.fills = [{ type: "SOLID", color: { r: 0.86, g: 0.90, b: 0.94 } }]
	frame.appendChild(avatar)
	frame.appendChild(createTextNode("امین فاضلی", { fontName: { family: "Inter", style: "Bold" }, fontSize: 18 }))
	frame.appendChild(createButton("ویرایش پروفایل", "secondary", styles))
	return frame
}

function createRepairRequestScreen(styles) {
	const frame = phoneScreenFrame("Repair Request", styles)
	frame.appendChild(topBar("درخواست تعمیر", styles))
	frame.appendChild(createInput("شناسه دوچرخه", "EB-5421", styles))
	frame.appendChild(createInput("نوع مشکل", "ترمز/لاستیک/روشن‌نمی‌شود", styles))
	frame.appendChild(createInput("توضیحات", "شرح مشکل...", styles))
	frame.appendChild(createButton("ارسال درخواست", "primary", styles))
	return frame
}

function createSupportScreen(styles) {
	const frame = phoneScreenFrame("Support", styles)
	frame.appendChild(topBar("پشتیبانی", styles))
	const chat = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 8, padding: 12, cornerRadius: 12 })
	chat.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.96 } }]
	chat.strokeWeight = 1
	chat.appendChild(createTextNode("سلام! چطور می‌تونم کمک کنم؟", { fontSize: 14 }))
	chat.appendChild(createTextNode("نیاز به راهنمایی در رزرو دارم", { fontSize: 14, color: styles.colors.subtext }))
	frame.appendChild(chat)
	frame.appendChild(createInput("پیام", "متن پیام...", styles))
	frame.appendChild(createButton("ارسال", "primary", styles))
	return frame
}

function createSettingsScreen(styles) {
	const frame = phoneScreenFrame("Settings", styles)
	frame.appendChild(topBar("تنظیمات", styles))
	const list = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 8, padding: 0, fills: [] })
	list.appendChild(createCard("اعلان‌ها", "روشن", "", styles))
	list.appendChild(createCard("زبان", "فارسی", "", styles))
	list.appendChild(createCard("حریم خصوصی", "مدیریت مجوزها", "", styles))
	frame.appendChild(list)
	return frame
}

function createNotificationsScreen(styles) {
	const frame = phoneScreenFrame("Notifications", styles)
	frame.appendChild(topBar("اعلان‌ها", styles))
	const list = createAutoLayoutFrame({ layoutMode: "VERTICAL", itemSpacing: 8, padding: 0, fills: [] })
	list.appendChild(createCard("رزرو تایید شد", "ساعت ۱۴:۳۰ امروز", "", styles))
	list.appendChild(createCard("تخفیف ویژه", "۲۰٪ تخفیف سفر بعدی", "", styles))
	frame.appendChild(list)
	return frame
}