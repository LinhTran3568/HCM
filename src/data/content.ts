export const SECTION_IDS = {
  hero: 'cau-chuyen',
  thesis: 'thong-diep',
  chuHieu: 'chu-hieu',
  giaoTrinh: 'giao-trinh',
  giaDinh: 'gia-dinh',
  oRieng: 'o-rieng',
  conclusion: 'ket-luan',
  footer: 'footer',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const NAV_LINKS: { id: SectionId; label: string; num: string }[] = [
  { id: SECTION_IDS.hero, label: 'Câu chuyện', num: '01' },
  { id: SECTION_IDS.chuHieu, label: 'Chữ hiếu', num: '03' },
  { id: SECTION_IDS.giaoTrinh, label: 'Giáo trình', num: '04' },
  { id: SECTION_IDS.giaDinh, label: 'Gia đình', num: '05' },
  { id: SECTION_IDS.oRieng, label: 'Ở riêng', num: '06' },
  { id: SECTION_IDS.conclusion, label: 'Kết luận', num: '07' },
]

export const HERO = {
  kicker: 'CHUYỆN SỐNG RIÊNG',
  headingLines: ['SỐNG RIÊNG', 'SAU KHI KẾT HÔN', 'LÀ TỰ LẬP', 'HAY BẤT HIẾU?'],
  accentLineIndexes: [2, 3],
  sub: 'Một lựa chọn của cuộc sống hiện đại hay một cách hiểu mới về gia đình?',
  cta: 'KHÁM PHÁ CÂU CHUYỆN',
  tagline: 'PHÂN TÍCH TỪ GÓC NHÌN VĂN HÓA — ĐẠO ĐỨC — CON NGƯỜI',
  scene: [
    'Lan và chồng vừa cưới, mong muốn ra ở riêng để tự lập, có không gian riêng cho gia đình nhỏ.',
    'Bố mẹ chồng mong con cái sống chung để cùng phụng dưỡng, giữ trọn sự gắn bó giữa các thế hệ.',
    'Hai cách sống, hai cách hiểu chữ hiếu — đâu là lựa chọn phù hợp cho một gia đình Việt hiện đại?',
  ],
  image: '/images/hero-bg.jpg',
  imageAlt: 'Ruộng bậc thang Mù Cang Chải lúc sáng sớm',
}

export const THESIS = {
  kicker: 'THESIS',
  num: '02',
  headlineLines: ['Ở RIÊNG', 'KHÔNG ĐỒNG NGHĨA', 'VỚI RỜI XA.'],
  sub: 'Khi một cặp vợ chồng chọn một mái nhà riêng, họ không nhất thiết đang chọn một khoảng cách với gia đình.',
  flow: [
    { num: '01', label: 'Ở RIÊNG', desc: 'Độc lập không gian sống' },
    { num: '02', label: 'TỰ LẬP', desc: 'Chủ động xây dựng tổ ấm' },
    { num: '03', label: 'TRÁCH NHIỆM', desc: 'Trọn vẹn đạo làm con' },
    { num: '04', label: 'GẮN KẾT', desc: 'Sợi dây tình thân bền chặt' },
  ],
}

export const CHU_HIEU = {
  kicker: 'CHỮ HIẾU',
  num: '03',
  title: 'Chữ hiếu, hai cách hiểu',
  sub: 'Không phải mâu thuẫn về đạo đức, mà là sự khác biệt về cách thực hiện giữa hai thời đại.',
  trad: {
    label: 'TRUYỀN THỐNG',
    badge: 'Gia đình truyền thống',
    name: 'Bố mẹ chồng',
    head: 'Đang bảo vệ',
    image: '/images/part2-bg.jpg',
    imageAlt: 'Gia đình nhiều thế hệ quây quần bên nhau',
    items: [
      'Chữ hiếu theo cách hiểu cổ điển',
      'Sự gắn bó giữa các thế hệ',
      'Trách nhiệm của con cái với cha mẹ',
      'Mô hình gia đình truyền thống',
      'Tình cảm và sự chăm sóc hằng ngày',
    ],
  },
  modern: {
    label: 'HIỆN ĐẠI',
    badge: 'Gia đình hạt nhân',
    name: 'Lan và chồng',
    head: 'Đang bảo vệ',
    image: '/images/part5-bg.jpg',
    imageAlt: 'Vợ chồng trẻ bên không gian riêng của mình',
    items: [
      'Tính tự lập của vợ chồng trẻ',
      'Quyền lựa chọn cách sống',
      'Không gian riêng của gia đình nhỏ',
      'Hạnh phúc của tổ ấm hai thế hệ',
      'Chủ động giảm xung đột thế hệ',
    ],
  },
  pullquote:
    'Hai bên không nhất thiết mâu thuẫn về mục tiêu cuối cùng — cả hai đều muốn gia đình hạnh phúc, các thành viên được quan tâm. Khác nhau chủ yếu ở cách thực hiện.',
  pullquoteSrc: 'Nhận định của nhóm',
}

export type GiaoTrinhCard = {
  no: string
  title: string
  src: string
  image: string
  imageAlt: string
  imageCaption: string
  quote: string
  apply: string
  isKey?: boolean
}

export const GIAO_TRINH = {
  kicker: 'GIÁO TRÌNH',
  num: '04',
  title: 'GIÁO TRÌNH NÓI GÌ?',
  introTitle: 'Tư tưởng Hồ Chí Minh về văn hóa, đạo đức, con người',
  introP:
    'Giáo trình không trực tiếp bàn về "gia đình hạt nhân", nhưng các quan điểm về con người, gia đình — tế bào của xã hội và nếp sống mới chính là cơ sở lý luận vững chắc để soi chiếu tình huống của Lan.',
  tabs: [
    { num: '01', label: 'CON NGƯỜI' },
    { num: '02', label: 'GIA ĐÌNH' },
    { num: '03', label: 'NẾP SỐNG MỚI' },
  ],
  cards: [
    {
      no: 'Luận điểm 1',
      title: 'Con người là mục tiêu và động lực của cách mạng',
      src: 'tr.152 – 153',
      image: '/images/bac-ho-chan-dung.jpg',
      imageAlt: 'Chân dung Chủ tịch Hồ Chí Minh (1946)',
      imageCaption: 'Ảnh tư liệu — Chân dung Chủ tịch Hồ Chí Minh (1946) (Wikimedia Commons, public domain)',
      quote:
        '"Con người phải được đặt vào vị trí trung tâm của sự phát triển, nhằm phát huy cao nhất mọi tiềm năng của con người." (tr.154) · "Vì lợi ích mười năm thì phải trồng cây / Vì lợi ích trăm năm thì phải trồng người." (tr.154)',
      apply:
        'Sống riêng giúp vợ chồng tự lập, có không gian để phát triển trách nhiệm với gia đình nhỏ — phù hợp tinh thần phát triển con người. Nhưng nếu bỏ mặc cha mẹ, cắt đứt quan hệ họ hàng thì lại đi ngược giá trị nhân ái, trách nhiệm.',
    },
    {
      no: 'Luận điểm 2',
      title: 'Gia đình là "tế bào của xã hội"',
      src: 'tr.140',
      image: '/images/bac-ho-thieu-nhi.jpg',
      imageAlt: 'Bác Hồ giao lưu với thiếu nhi',
      imageCaption: 'Ảnh tư liệu — Bác Hồ giao lưu thiếu nhi, thập niên 1950 (Wikimedia Commons, public domain)',
      quote: '"...phải được bắt đầu từ mỗi con người, mỗi gia đình với tư cách là tế bào của xã hội."',
      apply:
        'Dù ở chung hay ở riêng, điều quan trọng là quan hệ vợ chồng có tốt không, có trách nhiệm với cha mẹ không, có giáo dục con cái tốt không, có giữ được sự gắn kết giữa các thế hệ không.',
    },
    {
      no: 'Luận điểm 3',
      title: 'Nếp sống mới phải kế thừa truyền thống và tiếp thu cái mới',
      src: 'tr.140',
      image: '/images/bac-ho-bong-da.jpg',
      imageAlt: 'Bác Hồ xem bóng đá tại sân vận động Hàng Đẫy, Hà Nội (1958)',
      imageCaption: 'Ảnh tư liệu — Bác Hồ xem bóng đá tại Hà Nội, nếp sống văn hóa – thể thao (1958) (Wikimedia Commons, public domain)',
      quote:
        '"Nếp sống mới phải kế thừa những truyền thống tốt đẹp, những thuần phong mỹ tục lâu đời của nhân dân ta. Cái gì cũ mà xấu thì bỏ. Cái gì cũ mà không xấu thì phải sửa đổi cho hợp lý. Cái gì cũ mà tốt thì phát triển thêm. Cái gì mới mà hay thì phải làm, phải bổ sung."',
      apply:
        'Đây là chìa khóa giải quyết tình huống: không mô hình nào tốt hoàn toàn. Giữ cái tốt của truyền thống, sửa cái không còn phù hợp, tiếp thu cái mới hay.',
      isKey: true,
    },
  ],
}

export const GIA_DINH = {
  kicker: 'GIA ĐÌNH',
  num: '05',
  statementLines: ['TRUYỀN THỐNG', 'HẠT NHÂN'],
  statementNote: 'Hình thức gia đình thay đổi, nhưng những giá trị cốt lõi không nhất thiết biến mất.',
  sub: 'Gia đình hạt nhân là quy luật thích nghi của xã hội công nghiệp hiện đại, không phải là sự "suy thoái" của giá trị gia đình.',
  timeline: [
    {
      num: '01',
      title: 'GIA ĐÌNH TRUYỀN THỐNG',
      desc: 'Đại gia đình đa thế hệ, tập trung phụng dưỡng & gắn kết nề nếp',
    },
    {
      num: '02',
      title: 'GIA ĐÌNH HẠT NHÂN',
      desc: 'Cặp vợ chồng độc lập, linh hoạt thích nghi đời sống hiện đại',
    },
    {
      num: '03',
      title: 'GIÁ TRỊ CỐT LÕI',
      desc: 'Chữ hiếu, trách nhiệm & tình thân không hề mất đi',
    },
  ],
  timelineValues: ['HIẾU THẢO', 'TRÁCH NHIỆM', 'YÊU THƯƠNG', 'GẮN KẾT'],
  table: [
    { fn: 'Tình cảm', trad: 'Có', modern: 'Có' },
    { fn: 'Sinh con', trad: 'Có', modern: 'Có' },
    { fn: 'Nuôi dưỡng con', trad: 'Có', modern: 'Có' },
    { fn: 'Giáo dục con', trad: 'Nhiều thế hệ cùng tham gia', modern: 'Chủ yếu bố mẹ' },
    { fn: 'Kinh tế', trad: 'Đại gia đình cùng hỗ trợ', modern: 'Vợ chồng tự chủ hơn' },
    { fn: 'Chăm sóc người già', trad: 'Thường thuận lợi hơn', modern: 'Có thể khó hơn' },
    { fn: 'Gắn kết họ hàng', trad: 'Thường mạnh', modern: 'Có nguy cơ giảm' },
  ],
  noteStart: 'Chức năng gia đình không biến mất, chỉ thay đổi cách thực hiện — đúng tinh thần ',
  noteGold: '"cái cũ tốt thì phát triển thêm, cái mới hay thì bổ sung"',
  noteEnd: ' trong giáo trình.',
  uv: [
    {
      name: 'Gia đình truyền thống',
      good: ['Gắn kết và hỗ trợ nhau', 'Chăm sóc người già thuận lợi', 'Gìn giữ phong tục, tập quán'],
      bad: ['Dễ xung đột giữa các thế hệ', 'Ít không gian riêng tư', 'Áp lực duy trì nề nếp đại gia đình'],
    },
    {
      name: 'Gia đình hạt nhân',
      good: ['Vợ chồng tự lập, tự chủ', 'Không gian riêng tư, linh hoạt', 'Giảm mâu thuẫn thế hệ'],
      bad: ['Dễ giảm kết nối với ông bà, họ hàng', 'Áp lực chăm sóc gia đình nhỏ lớn hơn', 'Có nguy cơ xa cách cha mẹ già'],
    },
  ],
}

export const O_RIENG = {
  kicker: 'Ở RIÊNG',
  num: '06',
  headlineLines: ['Ở RIÊNG,', 'NHƯNG KHÔNG', 'SỐNG RIÊNG.'],
  accentLineIndex: 2,
  position: 'Nhóm chúng em lựa chọn mô hình gia đình hạt nhân nhưng không tách rời gia đình mở rộng.',
  positionSub:
    'Đó là cách giữ giá trị truyền thống nhưng thích nghi với đời sống hiện đại: ở riêng về không gian, không sống riêng về tình cảm và trách nhiệm.',
  poles: {
    leftLabel: 'KHÔNG GIAN RIÊNG',
    left: [
      { title: 'Nhà riêng', desc: 'Độc lập không gian sống của gia đình nhỏ' },
      { title: 'Quyết định riêng', desc: 'Chủ động công việc, tài chính và nuôi dạy con cái' },
      { title: 'Cuộc sống riêng', desc: 'Tự do sắp xếp nếp sống, hạn chế va chạm thế hệ' },
    ],
    rightLabel: 'KẾT NỐI GIA ĐÌNH',
    right: [
      { title: 'Quan tâm', desc: 'Thăm hỏi, gọi điện, về nhà chung vào các dịp cuối tuần' },
      { title: 'Chăm sóc', desc: 'Chăm sóc sức khỏe và hỗ trợ khi cha mẹ cần' },
      { title: 'Trách nhiệm', desc: 'Phụng dưỡng, làm gương về lòng hiếu thảo cho con cái' },
    ],
    centerImage: '/images/ban-tho.jpg',
    centerImageAlt: 'Bàn thờ gia tiên trong gia đình Việt Nam',
    centerCaption: 'Bàn thờ gia tiên (Donald Trung, CC BY-SA 4.0) — Wikimedia Commons',
  },
  values: [
    {
      num: '01',
      title: 'Thống nhất về chăm sóc',
      source: 'Chăm sóc ông bà',
      text: 'Đảm bảo người già được chăm sóc dù không sống chung nhà.',
    },
    {
      num: '02',
      title: 'Hỗ trợ gia đình',
      source: 'Hỗ trợ cha mẹ khi cần',
      text: 'Chủ động chia sẻ công việc, sức khỏe và lúc khó khăn.',
    },
    {
      num: '03',
      title: 'Chủ động giữ gắn kết',
      source: 'Thường xuyên về thăm cha mẹ',
      text: 'Duy trì gặp gỡ định kỳ để cha mẹ không cảm thấy cô đơn.',
    },
    {
      num: '04',
      title: 'Duy trì đoàn tụ',
      source: 'Duy trì các dịp lễ, Tết',
      text: 'Giữ sợi dây gắn kết họ hàng qua những dịp sum vầy.',
    },
    {
      num: '05',
      title: 'Giữ giá trị hiếu thảo',
      source: 'Giáo dục con về lòng hiếu thảo',
      text: 'Làm gương cho con về trách nhiệm với ông bà, cha mẹ.',
    },
    {
      num: '06',
      title: 'Tôn trọng truyền thống',
      source: 'Tôn trọng không gian của các thế hệ',
      text: 'Mỗi thế hệ có không gian riêng, cùng chia sẻ trách nhiệm chung.',
    },
  ],
}

export const CONCLUSION = {
  kicker: 'KẾT LUẬN',
  num: '07',
  quote1: 'Thiếu một đức',
  quote2: 'thì không thành người',
  src: 'Trích giáo trình — tr.145 (Cần, kiệm, liêm, chính là tứ đức)',
  own: 'Gia đình dù thay đổi hình thức, đạo đức cốt lõi vẫn phải được giữ vững.',
  message: [
    'Tự lập không phải là rời bỏ.',
    'Hiếu thảo không nhất thiết là sống chung.',
    'Điều quan trọng là cách chúng ta giữ lấy trách nhiệm và tình thân.',
  ],
  tag: 'TỰ LẬP × TRÁCH NHIỆM × GẮN KẾT',
}

export const REFERENCES = {
  label: 'TÀI LIỆU THAM KHẢO',
  note: 'Mọi câu trích hiển thị trên web đều nguyên văn từ giáo trình và ghi rõ số trang.',
  items: [
    'Giáo trình Tư tưởng Hồ Chí Minh — Chương VI: Tư tưởng Hồ Chí Minh về văn hóa, đạo đức, con người (tr.127 – 161).',
    'Hồ Chí Minh: Toàn tập, Nxb. Chính trị Quốc gia, Hà Nội (các trích dẫn được đối chiếu tại trang đã ghi).',
    'Ảnh "Ruộng bậc thang Mù Cang Chải" (Viethavvh, Public domain) — Wikimedia Commons.',
    'Ảnh "Bàn thờ gia tiên tại gia đình Việt Nam" (Donald Trung, CC BY-SA 4.0) — Wikimedia Commons.',
    'Ảnh "Bộ ấm trà Việt Nam" (Tonbi ko, CC BY-SA 4.0) — Wikimedia Commons.',
    'Ảnh "Nhà cổ Tấn Ký, Hội An" (P. Hughes, CC BY 4.0) — Wikimedia Commons.',
    'Ảnh "Hoa sen" (Hong Zhang, CC0) và "Cánh đồng lúa chín" (Basile Morin, CC BY-SA 4.0) — Wikimedia Commons.',
    'Ảnh tư liệu Chủ tịch Hồ Chí Minh: chân dung (1946), Bác Hồ giao lưu thiếu nhi (thập niên 1950) và Bác Hồ xem bóng đá tại Hà Nội (1958) — Wikimedia Commons (Public domain).',
  ],
}

export const FOOTER = {
  brand: 'NẾP NHÀ MỚI',
  desc: 'Một cách nhìn về gia đình, sự tự lập và chữ hiếu trong đời sống hiện đại.',
  tag: 'TỰ LẬP × TRÁCH NHIỆM × GẮN KẾT',
  summary:
    'Mô hình gia đình thay đổi, nhưng nếp nhà — chữ hiếu, trách nhiệm và tình thân giữa các thế hệ — vẫn là nền tảng bền vững. Cảm ơn thầy cô và các bạn đã lắng nghe bài thuyết trình của nhóm.',
  bottom: {
    line1: 'Nếp Nhà Mới — Web thuyết trình nhóm, học phần Tư tưởng Hồ Chí Minh.',
    line2: 'Mọi câu trích đều nguyên văn từ giáo trình và ghi rõ số trang.',
  },
}
