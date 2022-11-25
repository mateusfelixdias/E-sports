export interface IGames {
  data: Array<{ bannerUrl: string; id: string; title: string; _count: { ads: number } }> | []
}
