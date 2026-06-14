import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // 카카오톡/페이스북 등 링크 스크랩 봇이 세미나 다시보기 페이지의 미리보기
      // 카드를 만들지 못하게 해당 경로 크롤링을 차단한다. (OG 태그 제거와 병행)
      {
        userAgent: ['kakaotalk-scrap', 'facebookexternalhit', 'Facebot', 'Cowbot', 'Daumoa'],
        disallow: '/parents/seminar/replay',
      },
    ],
    sitemap: 'https://inheroedu.com/sitemap.xml',
  }
}
