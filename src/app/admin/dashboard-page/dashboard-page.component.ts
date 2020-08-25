import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../../shared/interfaces'
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription  // post getting subscription
  dSub: Subscription  // post removing subscription
  searchStr: string = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Post has been removed')
    })
  }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}